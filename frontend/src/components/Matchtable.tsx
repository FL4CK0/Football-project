import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Polling every 15 seconds
  useEffect(() => {
    const fetchMatches = () => {
      setLoading(true);
      fetch('/api/matches')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data: MatchesData) => {
          // Make sure data.matches exists and is an array
          if (!data.matches || !Array.isArray(data.matches)) {
            throw new Error('Invalid data format from API');
          }
          
          const sortedMatches = data.matches.sort((a, b) => {
            const timeA = new Date(a.utcDate).getTime();
            const timeB = new Date(b.utcDate).getTime();
            const timeDiff = timeA - timeB;
            if (timeDiff !== 0) return timeDiff;
        
            // If utcDates are equal, sort alphabetically by homeTeam name
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
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          console.error('Unable to fetch data:', error);
          setError('Failed to load matches. Please try again later.');
          setLoading(false);
        });
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusText = (match: Match) => {
    if (match.status === 'IN_PLAY') return 'Live';
    if (match.status === 'PAUSED') return 'Paused';
    if (match.status === 'FINISHED') return 'Finished';
    if (match.status === 'POSTPONED') return 'Postponed';
    
    // for scheduled matches format the time
    const matchDate = new Date(match.utcDate);
    // format HH:MM if today otherwise as date
    const today = new Date();
    if (matchDate.toDateString() === today.toDateString()) {
      return matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return matchDate.toLocaleDateString();
  };

  const getStatusClass = (match: Match) => {
    if (match.status === 'IN_PLAY') return 'in-play';
    if (match.status === 'FINISHED') return 'finished';
    return 'upcoming';
  };

  if (loading && matches.length === 0) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && matches.length === 0) {
    return <div className="p-8 text-center text-destructive">{error}</div>;
  }

  return (
    <div className="p-4">
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
            {matches.length > 0 ? (
              matches.map((match) => (
                <TableRow key={match.id} className={getStatusClass(match)}>
                  {/* Status */}
                  <TableCell className="px-2 py-1 text-sm">
                    <span className="status">{getStatusText(match)}</span>
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
                    {match.awayTeam.name || 'TBD'}
                    {match.awayTeam.crest && (
                      <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name || 'Away Team'}
                        className="inline-block w-6 h-6 ml-1 align-middle"
                      />
                    )}
                  </TableCell>

                  {/* Score */}
                  <TableCell className="whitespace-nowrap px-2 py-1 text-center text-sm font-bold">
                    {match.status === 'IN_PLAY' || match.status === 'FINISHED' ? (
                      <>
                        <span
                          className={cn(
                            (match.score.fullTime.home ?? 0) > (match.score.fullTime.away ?? 0)
                              ? 'font-extrabold text-primary'
                              : 'text-muted-foreground'
                          )}
                        >
                          {match.score.fullTime.home ?? '0'}
                        </span>
                        {' - '}
                        <span
                          className={cn(
                            (match.score.fullTime.away ?? 0) > (match.score.fullTime.home ?? 0)
                              ? 'font-extrabold text-primary'
                              : 'text-muted-foreground'
                          )}
                        >
                          {match.score.fullTime.away ?? '0'}
                        </span>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No matches found for the selected time period.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MatchTable;
