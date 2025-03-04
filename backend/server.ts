import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port: number = 3000;
const apiKey: string = '2483ac005a63468faa90a5cb576c5f1c';

app.use(cors());

// get all matches with date range filtering
app.get('/api/matches', async (req: Request, res: Response) => {
  try {
    const today = new Date();

    // fixed window, 1 day in the past to 2 days in the future
    const dateFrom = new Date(today);
    dateFrom.setDate(today.getDate() - 1);

    const dateTo = new Date(today);
    dateTo.setDate(today.getDate() + 2);

    const dateFromFormatted = dateFrom.toISOString().split('T')[0];
    const dateToFormatted = dateTo.toISOString().split('T')[0];

    const url = `https://api.football-data.org/v4/matches?dateFrom=${dateFromFormatted}&dateTo=${dateToFormatted}`;
    
    console.log(`Fetching matches from: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'X-Auth-Token': apiKey }
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API returned ${data.matches?.length || 0} matches`);
    
    res.json(data);
  } catch (error: any) {
    console.error('Unable to fetch data:', error);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
});

// get matches for a specific competition
app.get('/api/matches/competition/:id', async (req: Request, res: Response) => {
  try {
    const competitionId = req.params.id;
    console.log(`Fetching matches for competition ${competitionId}`);
    
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competitionId}/matches`,
      {
        method: 'GET',
        headers: { 'X-Auth-Token': apiKey }
      }
    );

    if (!response.ok) {
      console.error(`API error for competition ${competitionId}: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API returned ${data.matches?.length || 0} matches for competition ${competitionId}`);
    
    res.json(data);
  } catch (error: any) {
    console.error('Unable to fetch competition data:', error);
    res.status(500).json({ error: 'Unable to fetch competition data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
