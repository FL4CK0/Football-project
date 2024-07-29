async function fetchJSONData() {
    await fetch("http://localhost:3000/api/matches", {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
              console.log(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}

fetchJSONData();

function populateTable(data) {

    const {
        matches: { //sample code, change
        temperature_2m,
        wind_speed_10m,
        weather_code}} = data;
    

    const tableBody = document.querySelector('.tableBody');
    data.matches.forEach(match => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${match.date}</td>
            <td>${match.homeTeam} vs. ${match.awayTeam}</td>
            <td>${match.score}</td>
        `;
        tableBody.appendChild(row);
    });
}
