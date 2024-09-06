export function generateTable(names) {
    let tableBody = document.getElementById('friendTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    names.forEach(friendName => {
        let firstLetter = friendName.charAt(0).toUpperCase();
        let row = `<tr><td>${firstLetter}</td><td>${friendName}</td></tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById('friendTable').style.display = 'table'; // Show the table
}

export function filterTableByLetter(letter, names) {
    let tableBody = document.getElementById('friendTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    let filteredNames = names.filter(name => name.charAt(0).toUpperCase() === letter);

    filteredNames.forEach(friendName => {
        let row = `<tr><td>${letter}</td><td>${friendName}</td></tr>`;
        tableBody.innerHTML += row;
    });
}
