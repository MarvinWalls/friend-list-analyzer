function updateFriendTable(names) {
    let tableBody = document.getElementById('friendTableBody');
    tableBody.innerHTML = ''; // Clear previous data
    names.forEach(friendName => {
        let firstLetter = friendName.charAt(0).toUpperCase();
        let row = `<tr><td>${firstLetter}</td><td>${friendName}</td></tr>`;
        tableBody.innerHTML += row;
    });
    document.getElementById('friendTable').style.display = 'table';
}

function handleChartClick(chart, names) {
    chart.canvas.onclick = function(evt) {
        var activePoints = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        if (activePoints.length > 0) {
            var index = activePoints[0].index;
            var letter = chart.data.labels[index];
            var filteredNames = names.filter(name => name.startsWith(letter));

            updateFriendTable(filteredNames);
        }
    };
}
