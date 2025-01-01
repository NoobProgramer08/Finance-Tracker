const xValues = ["Active Users", "Inactive Users", "Total users"];
const yValues = [55, 49, 200];
const barColors = ["red", "green","blue"];
const insert = document.querySelector("#myChart");


  new Chart(insert, {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "World Wide Wine Production"
    }
  }
});

