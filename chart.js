function createChart(letterFrequency, censusFrequencies, names) {
    let labels = Object.keys(letterFrequency).sort();
    let yourData = [];
    let censusData = [];

    labels.forEach(letter => {
        yourData.push(((letterFrequency[letter] / names.length) * 100).toFixed(2));
        censusData.push(censusFrequencies[letter] || 0);
    });

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
            maintainAspectRatio: true,
            aspectRatio: 2,
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

    return myChart;
}
