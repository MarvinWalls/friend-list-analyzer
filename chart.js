let myChartInstance = null; // Global variable to track the chart instance

function generateChart(labels, yourData, censusData, handleChartClick) {
    var ctx = document.getElementById('myChart').getContext('2d');

    // Check if the chart instance exists to prevent re-rendering
    if (!myChartInstance) {
        // Create a new chart instance and store it globally
        myChartInstance = new Chart(ctx, {
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
                maintainAspectRatio: false,
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
                }
            }
        });

        // Bind the click event only once when the chart is initially created
        ctx.onclick = function(evt) {
            handleChartClick(evt, myChartInstance);
        };
    }
}

// Ensure the function is globally accessible
window.generateChart = generateChart;
