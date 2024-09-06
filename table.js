let currentTableData = null; // Global variable to store current table data

function generateTable(names) {
    let tableBody = document.getElementById('friendTableBody');
    
    // Store the names globally for reuse in filtering
    currentTableData = names;
    
    tableBody.innerHTML = ''; // Clear previous data

    names.forEach(friendName => {
        let firstLetter = friendName.charAt(0).toUpperCase();
        let truncatedName = friendName.length > 20 ? friendName.substring(0, 20) + '...' : friendName; // Limit name length
        let row = `<tr><td>${firstLetter}</td><td>${truncatedName}</td></tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById('friendTable').style.display = 'table'; // Show the table
}

function filterTableByLetter(letter) {
    let tableBody = document.getElementById('friendTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    // Use the globally stored currentTableData to filter by letter
    let filteredNames = currentTableData.filter(name => name.charAt(0).toUpperCase() === letter);

    filteredNames.forEach(friendName => {
        let truncatedName = friendName.length > 20 ? friendName.substring(0, 20) + '...' : friendName; // Limit name length
        let row = `<tr><td>${letter}</td><td>${truncatedName}</td></tr>`;
        tableBody.innerHTML += row;
    });

    // Show the filtered table if it's hidden
    document.getElementById('friendTable').style.display = 'table';
}

// Ensure the functions are accessible globally
window.generateTable = generateTable;
window.filterTableByLetter = filterTableByLetter;
