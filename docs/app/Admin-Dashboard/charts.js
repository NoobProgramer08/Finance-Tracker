console.log("charts")
google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    // Set Data
    const data = google.visualization.arrayToDataTable([
    ['Users', 'Mhl'],
    ['Active Users',  100],
    ['Inactive Users', 49],
    ['Engaging Users', 44],  
    ]);
    
    // Set Options
    const options = {
    title: 'Users Status'
    };
    
    // Draw
    const chart = new google.visualization.BarChart(document.getElementById('chart'));
    chart.draw(data, options);
    
    }