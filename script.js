document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.target.result, 'text/html');
        
        // Extract names from div with class _a6-i
        let names = Array.from(doc.querySelectorAll('div._a6-i')).map(el => el.textContent.trim());

        // Log names to console for debugging
        console.log('Extracted names:', names);
        
        // Displaying the extracted names
        document.getElementById('results').textContent = 'Extracted names: ' + names.join(', ');
    };
    
    reader.readAsText(file);
});
