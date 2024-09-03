document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.target.result, 'text/html');
        
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

        // Calculate total names for percentage calculation
        let totalNames = names.length;

        // Display the letter frequencies and compare with Census data
        let resultString = 'Letter Frequency Comparison: <br>';
        for (let letter in letterFrequency) {
            let frequency = ((letterFrequency[letter] / totalNames) * 100).toFixed(2); // Calculate percentage
            let censusFrequency = censusFrequencies[letter] || 0; // Get census frequency or 0 if not found
            resultString += `${letter}: ${frequency}% (Your Data) vs ${censusFrequency}% (Census Data)<br>`;
        }

        document.getElementById('results').innerHTML = resultString;
    };
    
    reader.readAsText(file);
});
