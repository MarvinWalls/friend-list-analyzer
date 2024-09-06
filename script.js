import { handleFileUpload } from './fileHandling.js';
import { calculateLetterFrequency } from './nameFrequency.js';
import { generateChart } from './chart.js';
import { generateTable, filterTableByLetter } from './table.js';

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file.type !== 'text/html') {
        document.getElementById('results').innerHTML = `<p style="color: red;">Please upload a valid HTML file.</p>`;
        return;
    }

    handleFileUpload(file, (userName, names) => {
        // Calculate letter frequency
        let letterFrequency = calculateLetterFrequency(names);

        // US Census letter frequencies
        const censusFrequencies = {
            'A': 7.32, 'B': 5.39, 'C': 8.16, 'D': 8.48, 'E': 5.22, 'F': 1.98,
            'G': 3.72, 'H': 2.56, 'I': 0.77, 'J': 10.33, 'K': 4.60, 'L': 6.25,
            'M': 9.73, 'N': 2.01, 'O': 0.50, 'P': 2.98, 'Q': 0.04, 'R': 6.08,
            'S': 6.45, 'T': 3.80, 'U': 0.02, 'V': 1.61, 'W': 1.66, 'X': 0.01,
            'Y': 0.22, 'Z': 0.09
        };

        // Calculate user letter frequency and census comparison
        let labels = Object.keys(letterFrequency).sort();
        let yourData = [];
        let censusData = [];

        labels.forEach(letter => {
            yourData.push(((letterFrequency[letter] / names.length) * 100).toFixed(2));
            censusData.push(censusFrequencies[letter] || 0);
        });

        generateTable(names);  // Populate the full table

        // Generate the chart and handle click events
        generateChart(labels, yourData, censusData, function(evt) {
            var activePoints = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
            if (activePoints.length > 0) {
                var index = activePoints[0].index;
                var letter = labels[index];
                filterTableByLetter(letter, names);
            }
        });
    });
});
