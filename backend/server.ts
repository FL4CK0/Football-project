import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port: number = 3000;
const apiKey: string = '2483ac005a63468faa90a5cb576c5f1c';

app.use(cors());

const today: Date = new Date();
const tomorrow: Date = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const todayFormatted: string = today.toISOString().slice(0, 10);
const tomorrowFormatted: string = tomorrow.toISOString().slice(0, 10);


app.get('/api/matches', async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches`,
      {
        method: 'GET',
        headers: { 'X-Auth-Token': apiKey }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error('Unable to fetch data:', error);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
