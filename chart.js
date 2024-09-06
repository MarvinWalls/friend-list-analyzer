function generateChart(labels, yourData, censusData, handleChartClick) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Your Data (%)',
                    data: yourData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Census Data (%)',
                    data: censusData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allow more flexibility with the chart's size
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequency (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Letter'
                    }
                }
            },
            onClick: function (evt, activeElements) {
                if (activeElements.length > 0) {
                    const clickedIndex = activeElements[0].index;
                    const clickedLabel = this.data.labels[clickedIndex]; // Get clicked label/letter
                    handleChartClick(clickedLabel); // Pass clicked letter to the handler
                }
            }
        }
    });
}

// Ensure the function is globally accessible
window.generateChart = generateChart;
