import { parseCSV, isNumeric, isValidDate, round } from "./utils.js";

function createChart(
  containerId,
  csvText,
  seriesScheme,
) {
  //parse from csv
  const rawdata = parseCSV(csvText)
    .map((d) => ({
      ...d,
      date: new Date(d["Timestamp"] * 1000),
    }))
    .filter((d) => isValidDate(d.date));

  rawdata.sort((a, b) => a.date.getTime() - b.date.getTime());

  //series
  const series = seriesScheme.map((item) => {
    const data = rawdata.map((d) => ({
      date: d.date,
      value: isNumeric(d[item.name]) ? d[item.name] * 1 : null,
    }));

    return {
      ...item,
      type: "line",
      data: data.map((d) => [d.date.getTime(), d.value]),
    };
  });

  //chart options
  const options = {
    exporting: {
      enabled: false,
    },

    title: {
      text: null,
    },

    subtitle: {
      text: null,
    },

    chart: {
      panning: false,
      animation: true,
      style: {
        "font-size": "12px",
        "font-family": "'Archivo', Arial, Helvetica, sans-serif",
      },
      marginRight: 60,
      events: {},
    },

    navigator: {
      enabled: false,
    },

    scrollbar: {
      enabled: false,
    },

    credits: { enabled: false },

    yAxis: {
      title: {
        text: null,
      },
      labels: {
        align: "left",
        x: 0,
        y: -4,
        formatter: function () {
          return this.isLast ? this.value + " X returns" : this.value;
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
          return Highcharts.dateFormat("%b %y", this.value);
        },
      },
      gridLineWidth: 1,
      lineWidth: 0,
      tickWidth: 0,
      minPadding: 0,
      maxPadding: 0,
    },
    legend: {
      enabled:true,
      layout: "horizontal",
      align: "left",
      verticalAlign: "top",
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
          align: "left",
          inside: false,
          crop: false,
          overflow: "allow",
          formatter: function () {
            // if last point
            if (this.point === this.series.data[this.series.data.length - 1]) {
              return this.series.name;
            }
          },
        },
        marker: {
          enabled: false,
        },
      },
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
      backgroundColor: null,
      borderColor: null,
      borderWidth: null,
      useHTML: true,
      formatter: function () {
        const rows = [
          `<div style="color:${this.color};font-weight:bold;">${this.series.name}</div>`,
          `<div >${Highcharts.dateFormat("%b %d", this.x)}</div>`,
          `<div>${round(this.y, 2, true)} X</div>`,
        ];

        return `<div style="text-align: right;text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
               1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;">${rows.join(
                 ""
               )}</div>`;
      },
    },
  };

  //
  var isYAxisLogarithmic = false;

  //create chart
  options.yAxis.type = isYAxisLogarithmic ? "logarithmic" : "linear";
  const chart = Highcharts.chart(containerId, options);

  //event
  //button
  const button = document.createElement("button");
  const container = document.getElementById(containerId);
  container.parentNode.insertBefore(button, container);
  button.addEventListener("click", handleSwitch);

  updateButton();

  function handleSwitch() {
    isYAxisLogarithmic = !isYAxisLogarithmic;
    updateButton();

    chart.yAxis[0].update({
      type: isYAxisLogarithmic ? "logarithmic" : "linear",
    });
  }

  function updateButton() {
    button.innerHTML = isYAxisLogarithmic
      ? "Logarithmic Scale"
      : "Linear Scale";
  }
}

export default createChart;
