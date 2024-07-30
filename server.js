import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;


const apiKey = '2483ac005a63468faa90a5cb576c5f1c';

app.use(cors());

app.get('/api/matches', async (req, res) => {
    try {
        const response = await fetch('https://api.football-data.org/v4/matches?dateFrom=2024-07-27&dateTo=2024-07-31', { //https://api.football-data.org/v4/matches?dateFrom=2024-07-29&dateTo=2024-07-31
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Unable to fetch data:', error);
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});