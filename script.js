document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.target.result, 'text/html');
        
        // Extract user's name
        let userNameElement = doc.querySelector('span._a7cv');
        let userName = userNameElement ? userNameElement.textContent.trim() : 'User';

        // Extract names from div with class _a6-i
        let names = Array.from(doc.querySelectorAll('div._a6-i')).map(el => el.textContent.trim());

        // Extract the first letter of each name and count the frequency
        let letterFrequency = {};
        names.forEach(name => {
            let firstLetter = name.charAt(0).toUpperCase(); // Get the first letter and convert to uppercase

            // Check if the first letter is an English alphabet letter
            if (firstLetter >= 'A' && firstLetter <= 'Z') {
                if (letterFrequency[firstLetter]) {
                    letterFrequency[firstLetter]++;
                } else {
                    letterFrequency[firstLetter] = 1;
                }
            }
        });

        // US Census letter frequencies
        const censusFrequencies = {
            'A': 7.32, 'B': 5.39, 'C': 8.16, 'D': 8.48, 'E': 5.22, 'F': 1.98,
            'G': 3.72, 'H': 2.56, 'I': 0.77, 'J': 10.33, 'K': 4.60, 'L': 6.25,
            'M': 9.73, 'N': 2.01, 'O': 0.50, 'P': 2.98, 'Q': 0.04, 'R': 6.08,
            'S': 6.45, 'T': 3.80, 'U': 0.02, 'V': 1.61, 'W': 1.66, 'X': 0.01,
            'Y': 0.22, 'Z': 0.09
        };

        // Get the first letter of the user's name
        let userFirstLetter = userName.charAt(0).toUpperCase();
        let userLetterFrequency = ((letterFrequency[userFirstLetter] / names.length) * 100).toFixed(2);
        let censusLetterFrequency = censusFrequencies[userFirstLetter] || 0;
        let percentageDifference = (((userLetterFrequency - censusLetterFrequency) / censusLetterFrequency) * 100).toFixed(2);

        // Prepare data for the chart in alphabetical order
        let labels = Object.keys(letterFrequency).sort();
        let yourData = [];
        let censusData = [];

        labels.forEach(letter => {
            yourData.push(((letterFrequency[letter] / names.length) * 100).toFixed(2));
            censusData.push(censusFrequencies[letter] || 0);
        });

        // Create the chart
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

        // Display personalized greeting
        document.getElementById('results').innerHTML = `<h3>Hello ${userName}! Your first name starts with '${userFirstLetter}', which appears ${percentageDifference}% ${percentageDifference >= 0 ? 'more' : 'less'} than the census average.</h3>`;

        // Display results for clicking on a letter in the chart
        ctx.onclick = function(evt) {
            var activePoints = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
            if (activePoints.length > 0) {
                var index = activePoints[0].index;
                var letter = labels[index];
                var filteredNames = names.filter(name => name.startsWith(letter));
                document.getElementById('results').innerHTML += `<h3>Names starting with '${letter}':</h3><p>${filteredNames.join(', ')}</p>`;
            }
        };
    };
    
    reader.readAsText(file);
});
