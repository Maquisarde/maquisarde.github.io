import { parseCSV, isNumeric, isValidDate, round } from "./utils.js";

function createChart(containerId, csvText) {
  //parse from csv
  const rawdata = parseCSV(csvText)
    .map((d) => ({
      date: new Date(d.timestamp),
      price: isNumeric(d.token_price) ? d.token_price * 1 : null,
    }))
    .filter((d) => isValidDate(d.date));

  rawdata.sort((a, b) => a.date.getTime() - b.date.getTime());

  //data
  const data = rawdata.map((d) => [d.date.getTime(), d.price]);

  //series
  const series = [
    {
      name: "price",
      data: data,
      type: "line",
      color: "#2B1E70",
    },
    // {
    //   name: "baseline",
    //   data: [
    //     [data[0][0], baselineValue],
    //     [data[data.length - 1][0], baselineValue],
    //   ],
    //   type: "line",
    //   color: "grey",
    //   dashStyle: "Dot",
    //   states: {
    //     hover: {
    //       enabled: false,
    //     },
    //   },
    //   enableMouseTracking: false,
    // },
  ];

  //chart options
  const options = {
    title: {
      text: null,
    },
    exporting: {
      enabled: false,
    },
    subtitle: {
      text: null,
    },
    chart: {
      style: {
        "font-size": "12px",
        "font-family": "'Archivo', Arial, Helvetica, sans-serif",
      },
      panning: true,
      zoomType: 'xy',
      // animation: true,
      marginRight: 40,
      events: {
        render(e) {
          const xAxis = e.target.xAxis[0];
          const yAxis = e.target.yAxis[0];

          const dataInRange = data.filter(
            (d) => xAxis.min <= d[0] && d[0] <= xAxis.max
          );

          yAxis.removePlotLine();

          if (dataInRange.length !== 0)
            yAxis.addPlotLine({
              value: dataInRange[0][1],
              color: "grey",
              dashStyle: "Dot",
              width: 2,
            });

          //card
          const cardEl = document.getElementById(containerId + "-card");
          setPriceChangeCard(cardEl, dataInRange, true, [xAxis.min, xAxis.max]);
        },
      },
      zooming: {
        type: "xy",
        pinchType: "x",
      },
    },
    scrollbar: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: true,
      series: {
        type: "area",
        data,
        color: "rgb(78, 124, 255)",
        fillColor: "rgba(78, 124, 255,0.1)",
        dashStyle: undefined,
        dataGrouping: {
          enabled: false,
        },
        lineWidth: 1,
        marker: {
          enabled: false,
        },
      },
    },

    credits: { enabled: false },

    yAxis: {
      title: {
        text: null,
      },
      opposite: false,
      crosshair: {
        color: "#B2B5BE",
        dashStyle: "Dash",
        width: 1,
        label: {
          enabled: true,
          backgroundColor: "grey",
          color: "white",
          formatter: function (value) {
            return round(value, 2, true);
          },
        },
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Date",
      },
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%d %b %y", this.value);
        },
      },
      gridLineWidth: 1,
      lineWidth: 0,
      tickWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      crosshair: {
        color: "#B2B5BE",
        dashStyle: "Dash",
        width: 1,
        label: { enabled: true, backgroundColor: "grey", color: "white" },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: false,
        },
        // animation: true,
      },
      // animation: true,
    },
    series: series,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {},
        },
      ],
    },

    tooltip: {
      split: true,
      backgroundColor: null,
      borderColor: null,
      borderWidth: null,
      useHTML: true,
      formatter: function () {
        const rows = [
          `<div style="color:${
            this.color
          };font-weight:bold;">${Highcharts.dateFormat(
            "%d/%m/%Y",
            this.x
          )}</div>`,
          `<div style="color:${
            this.color
          };font-weight:bold;">${Highcharts.dateFormat("%H:%M", this.x)}</div>`,
          ,
          `<div>$${round(this.y, 4, true)}</div>`,
        ];

        return `<div style="text-align:right;text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
               1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;">${rows.join(
                 ""
               )}</div>`;
      },
    },
    xDateFormat: "%d %b %Y",
  };

  //containerEl
  const containerEl = document.getElementById(containerId);
  containerEl.classList.add("chart-container");

  //chart
  const chartWrapperEl = document.createElement("div");
  chartWrapperEl.setAttribute("id", containerId + "-chart");
  containerEl.appendChild(chartWrapperEl);

  //create chart
  const chart = Highcharts.stockChart(containerId + "-chart", options);

  //card
  const cardEl = document.createElement("div");
  cardEl.setAttribute("id", containerId + "-card");
  cardEl.setAttribute("class", "price-change-card");
  containerEl.appendChild(cardEl);

  const priceEl = document.createElement("span");
  priceEl.setAttribute("class", "price");
  cardEl.appendChild(priceEl);

  const changeEl = document.createElement("span");
  changeEl.setAttribute("class", "change");
  cardEl.appendChild(changeEl);

  //button group
  const btnsWrapperEl = document.createElement("div");
  btnsWrapperEl.setAttribute("class", "btn-group-wrapper");
  containerEl.parentNode.insertBefore(btnsWrapperEl, containerEl);

  const btnsEl = document.createElement("ul");
  btnsEl.setAttribute("class", "btn-group");
  btnsWrapperEl.appendChild(btnsEl);

  //button time zoom
  const minTime = Math.min(...data.map((d) => d[0]));
  const maxTime = Math.max(...data.map((d) => d[0]));

  const yearFirstDayTime = new Date(
    new Date(maxTime).getFullYear(),
    0,
    1,
    0,
    0,
    0
  ).getTime();

  const oneday = 24 * 3600 * 1000;

  [
    { text: "1D", min: maxTime - oneday },
    { text: "7D", min: maxTime - oneday * 7 },
    { text: "1M", min: maxTime - oneday * 30 },
    { text: "3M", min: maxTime - oneday * 90 },
    { text: "1Y", min: maxTime - oneday * 365 },
    { text: "YTD", min: yearFirstDayTime },
    { text: "All", min: minTime, selected: true },
  ].forEach((d, _, a) => {
    //create element
    const li = document.createElement("li");
    li.innerHTML = d.text;
    btnsEl.appendChild(li);
    d.btn = li;

    //if disabled
    const subset = data.filter((f) => f[0] <= d.min);
    d.disabled = subset.length == 0;
    if (d.disabled) {
      li.classList.add("disabled");
    }

    //if selected by default
    if (d.selected) {
      li.classList.add("selected");
      setPriceChangeCard(cardEl, data, false, [d.min, maxTime]);
    } else {
      li.classList.remove("selected");
    }

    //event
    li.addEventListener("click", () => {
      if (d.disabled) return;
      a.forEach((dd) => {
        if (dd == d) {
          dd.btn.classList.add("selected");
        } else {
          dd.btn.classList.remove("selected");
        }
      });

      chart.xAxis[0].setExtremes(d.min, maxTime, true, false);
    });
  });

  //
  [{ text: "LOG", selected: false }].forEach((d, i, a) => {
    const li = document.createElement("li");
    li.innerHTML = d.text;
    if (d.selected) {
      li.classList.add("selected");
    } else {
      li.classList.remove("selected");
    }

    d.btn = li;
    btnsEl.appendChild(li);

    //
    li.addEventListener("click", () => {
      d.selected = !d.selected;
      if (d.selected) {
        d.btn.classList.add("selected");
      } else {
        d.btn.classList.remove("selected");
      }

      chart.yAxis[0].update({
        type: d.selected ? "logarithmic" : "linear",
      });
    });
  });
}

function setPriceChangeCard(card, data, isDataInRange, timeRange) {
  if (card === null) return;
  const subset = isDataInRange
    ? data
    : data.filter((d) => timeRange[0] <= d[0] && d[0] <= timeRange[1]);

  const hasData = subset.length !== 0;

  const price0 = hasData ? subset[0][1] : undefined;
  const price1 = hasData ? subset[subset.length - 1][1] : undefined;
  const change = hasData ? (price1 - price0) / price0 : undefined;

  //price
  const priceEl = card.getElementsByClassName("price")[0];
  priceEl.innerHTML = `$ ${hasData ? round(price1, 4, false) : "-"}`;

  //change
  const changeEl = card.getElementsByClassName("change")[0];
  changeEl.setAttribute(
    "class",
    change > 0
      ? "change change-positive"
      : change < 0
      ? "change change-negative"
      : "change"
  );

  const sign = change > 0 ? "+" : change < 0 ? "-" : "";
  changeEl.innerHTML = `${sign}${
    hasData ? Math.abs(round(100 * change, 2, false)) + "%" : "-"
  }`;
}

export default createChart;
