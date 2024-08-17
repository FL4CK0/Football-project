async function fetchJSONData() {
    try {
        const res = await fetch("http://localhost:3000/api/matches", {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        console.log(data); // Debugging: check if 'data' is correctly fetched

        // Extract the matches array from the data
        const matches = data.matches;

        // Get the table body element using the class name
        const tableBody = document.querySelector(".tableBody");

        if (!tableBody) {
            throw new Error("Table body element not found.");
        }

        // Clear existing rows in the table body
        tableBody.innerHTML = "";

        // Iterate through the matches and create rows
        matches.forEach(match => {
            const row = document.createElement("tr");

            const matchDate = new Date(match.utcDate).toLocaleDateString();
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const score = `${match.score.fullTime.home} - ${match.score.fullTime.away}`;

            const dateCell = document.createElement("td");
            dateCell.textContent = matchDate;

            const teamsCell = document.createElement("td");
            teamsCell.textContent = `${homeTeam} vs. ${awayTeam}`;

            const scoreCell = document.createElement("td");
            scoreCell.textContent = score;

            row.appendChild(dateCell);
            row.appendChild(teamsCell);
            row.appendChild(scoreCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}

fetchJSONData();


