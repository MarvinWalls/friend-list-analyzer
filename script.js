<<<<<<< HEAD
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
=======
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.target.result, 'text/html');
        
        // Example: Extracting names assuming they are in <span class="friend-name">
        let names = Array.from(doc.querySelectorAll('.friend-name')).map(el => el.textContent.trim());

        // Displaying the extracted names
        document.getElementById('results').textContent = 'Extracted names: ' + names.join(', ');
        
        // Further analysis would go here
    };
    
    reader.readAsText(file);
});
>>>>>>> c914d574636c01de7bf6d1e4e81e03da2f0ed34e
