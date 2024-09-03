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
            if (letterFrequency[firstLetter]) {
                letterFrequency[firstLetter]++;
            } else {
                letterFrequency[firstLetter] = 1;
            }
        });

        // Log frequencies for debugging
        console.log('Letter Frequency:', letterFrequency);

        // Display the letter frequencies
        let resultString = 'Letter Frequency: <br>';
        for (let letter in letterFrequency) {
            resultString += `${letter}: ${letterFrequency[letter]}<br>`;
        }
        document.getElementById('results').innerHTML = resultString;
    };
    
    reader.readAsText(file);
});
