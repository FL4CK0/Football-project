import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Team {
  id: number | null;
  name: string | null;
  crest: string | null;
}

interface Score {
  fullTime: {
    home: number | null;
    away: number | null;
  };
}

interface Competition {
  id: number;
  name: string;
  emblem: string | null;
}

interface Match {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'IN_PLAY' | 'FINISHED' | 'PAUSED' | 'POSTPONED';
  matchday: number;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}

interface MatchesData {
  matches: Match[];
}

const MatchTable: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  // Polling every 15 seconds
  useEffect(() => {
    const fetchMatches = () => {
      fetch('/api/matches')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data: MatchesData) => {
            const sortedMatches = data.matches.sort((a, b) => {
              const timeA = new Date(a.utcDate).getTime();
              const timeB = new Date(b.utcDate).getTime();
              const timeDiff = timeA - timeB;
              if (timeDiff !== 0) return timeDiff;
          
              // If utcDates are equal, sort alphabetically by homeTeam name (fallback to empty string if null)
              const nameA = (a.homeTeam.name || "").toLowerCase();
              const nameB = (b.homeTeam.name || "").toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
          
              // If homeTeam names are equal, sort alphabetically by awayTeam name
              const awayA = (a.awayTeam.name || "").toLowerCase();
              const awayB = (b.awayTeam.name || "").toLowerCase();
              if (awayA < awayB) return -1;
              if (awayA > awayB) return 1;
              
              return 0;
            });
            setMatches(sortedMatches);
          })
          
        .catch((error) => console.error('Unable to fetch data:', error));
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusText = (match: Match) => {
    if (match.status === 'IN_PLAY') return 'In Play';
    if (match.status === 'FINISHED') return 'Finished';
    return new Date(match.utcDate).toLocaleDateString();
  };

  return (
    <div className="p-4">
      {/* Only scroll if table is too wide */}
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 px-2 py-1 text-left text-sm">Status</TableHead>
              <TableHead className="w-44 px-2 py-1 text-left text-sm">Competition</TableHead>
              <TableHead className="w-44 px-2 py-1 text-left text-sm">Home Team</TableHead>
              <TableHead className="w-8 px-2 py-1 text-center text-sm"></TableHead>
              <TableHead className="w-44 px-2 py-1 text-right text-sm">Away Team</TableHead>
              <TableHead className="w-24 px-2 py-1 text-center text-sm">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                {/* Status */}
                <TableCell className="whitespace-nowrap px-2 py-1 text-sm">
                  {getStatusText(match)}
                </TableCell>

                {/* Competition */}
                <TableCell className="whitespace-nowrap px-2 py-1 text-sm overflow-hidden">
                  {match.competition.emblem && (
                    <img
                      src={match.competition.emblem}
                      alt={match.competition.name}
                      className="inline-block w-4 h-4 mr-1 align-middle"
                    />
                  )}
                  {match.competition.name}
                </TableCell>

                {/* Home Team */}
                <TableCell className="whitespace-nowrap px-2 py-1 text-sm overflow-hidden">
                  {match.homeTeam.crest && (
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name || 'Home Team'}
                      className="inline-block w-6 h-6 mr-1 align-middle"
                    />
                  )}
                  {match.homeTeam.name || 'TBD'}
                </TableCell>

                {/* vs */}
                <TableCell className="px-2 py-1 text-center text-sm">vs</TableCell>

                {/* Away Team */}
                <TableCell className="whitespace-nowrap px-2 py-1 text-sm text-right overflow-hidden">
                  {match.awayTeam.crest && (
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name || 'Away Team'}
                      className="inline-block w-6 h-6 mr-1 align-middle"
                    />
                  )}
                  {match.awayTeam.name || 'TBD'}
                </TableCell>

                {/* Score */}
                <TableCell className="whitespace-nowrap px-2 py-1 text-center text-sm font-bold">
                  {match.status === 'IN_PLAY' || match.status === 'FINISHED' ? (
                    <>
                      <span
                        className={
                          (match.score.fullTime.home ?? 0) >
                          (match.score.fullTime.away ?? 0)
                            ? 'font-extrabold text-primary'
                            : 'text-gray-600'
                        }
                      >
                        {match.score.fullTime.home ?? 'N/A'}
                      </span>
                      {' - '}
                      <span
                        className={
                          (match.score.fullTime.away ?? 0) >
                          (match.score.fullTime.home ?? 0)
                            ? 'font-extrabold text-primary'
                            : 'text-gray-600'
                        }
                      >
                        {match.score.fullTime.away ?? 'N/A'}
                      </span>
                    </>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MatchTable;
