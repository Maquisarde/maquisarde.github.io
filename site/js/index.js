import createChart1 from "./chart1.js";
import createChart2 from "./chart2.js";

//
fetch("https://www.dropbox.com/s/1mok8uvlgl4xj9i/online_rend_all.csv?dl=1,{ mode: 'no-cors'}")
  .then((res) => res.text())
  .then((csvText) => {
    const series = [
      { name: "Peccala", color: "#2B1E70" },
      { name: "BTC", color: "#F7931A" },
      { name: "ETH", color: "#3c3c3d" },
      { name: "XRP", color: "#00aae4" },
    ];

    createChart1("chart1-high-risk", csvText, series);
  })
  .catch((e) => {
    console.error("e", e);
  });

//
fetch("https://www.dropbox.com/s/2wewp54g6hx971l/online_rend_all_medium.csv?dl=1,{ mode: 'no-cors'}")
  .then((res) => res.text())
  .then((csvText) => {
    const series = [
      { name: "Peccala", color: "#2B1E70" },
      { name: "BTC/USDT", color: "#F7931A" },
      { name: "ETH/USDT", color: "#3c3c3d" },
      { name: "XRP/USDT", color: "#00aae4" },
    ];

    createChart1("chart1-medium-risk", csvText, series);
  })
  .catch((e) => {
    console.error("e", e);
  });

//
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTEO-RhkWqL8YEmHDDajNl74WK9Q4RqcRXVoxxaVBA66AdndxZ5HgZOOo0NAvY9nOZEcxqQ6oZ1p1wE/pub?gid=0&single=true&output=csv")
  .then((res) => res.text())
  .then((csvText) => {
    createChart2("chart2-high-risk", csvText);
  })
  .catch((e) => {
    console.error("e", e);
  });

//
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTEO-RhkWqL8YEmHDDajNl74WK9Q4RqcRXVoxxaVBA66AdndxZ5HgZOOo0NAvY9nOZEcxqQ6oZ1p1wE/pub?gid=1193723508&single=true&output=csv")
  .then((res) => res.text())
  .then((csvText) => {
    createChart2("chart2-medium-risk", csvText);
  })
  .catch((e) => {
    console.error("e", e);
  });
