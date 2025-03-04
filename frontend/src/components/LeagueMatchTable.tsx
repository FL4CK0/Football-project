// frontend/src/components/LeagueMatchTable.tsx
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
  code?: string;
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

interface LeagueMatchTableProps {
  leagueId: number;
}

// Map to hold league IDs from the football-data.org API
const LEAGUE_IDS = {
  premierLeague: 2021,
  laLiga: 2014,
  bundesliga: 2002,
  serieA: 2019,
  ligue1: 2015
};

const LeagueMatchTable: React.FC<LeagueMatchTableProps> = ({ leagueId }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Group matches by date
  const matchesByDate = React.useMemo(() => {
    const grouped: Record<string, Match[]> = {};
    
    matches.forEach(match => {
      const matchDate = new Date(match.utcDate);
      const dateKey = matchDate.toDateString();
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      
      grouped[dateKey].push(match);
    });
    
    // Sort matches within each day
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => {
        return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
      });
    });
    
    return grouped;
  }, [matches]);

  // Format the date as "Today", "Tomorrow", or day name
  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      // Format as "Friday, 10 Nov" etc.
      return date.toLocaleDateString(undefined, { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  // Fetch matches specifically for this league
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Request matches for this specific competition
    fetch(`/api/matches/competition/${leagueId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Check if we have a matches array
        if (!data.matches || !Array.isArray(data.matches)) {
          throw new Error('Invalid data format from API');
        }
        
        // Filter for matches in the next 14 days or from the past 2 days
        const now = new Date();
        const past2Days = new Date(now);
        past2Days.setDate(now.getDate() - 2);
        
        const next14Days = new Date(now);
        next14Days.setDate(now.getDate() + 14);
        
        const filteredMatches = data.matches.filter((match: Match) => {
          const matchDate = new Date(match.utcDate);
          return matchDate >= past2Days && matchDate <= next14Days;
        });
        
        setMatches(filteredMatches);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Unable to fetch data:', error);
        setError('Failed to load matches. Please try again later.');
        setLoading(false);
      });
  }, [leagueId]);

  const getStatusText = (match: Match) => {
    if (match.status === 'IN_PLAY') return 'Live';
    if (match.status === 'PAUSED') return 'Paused';
    if (match.status === 'FINISHED') return 'Finished';
    if (match.status === 'POSTPONED') return 'Postponed';
    
    // For scheduled matches, format the time
    const matchDate = new Date(match.utcDate);
    return matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusClass = (match: Match) => {
    if (match.status === 'IN_PLAY') return 'in-play';
    if (match.status === 'FINISHED') return 'finished';
    return 'upcoming';
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-destructive">{error}</div>;
  }

  if (matches.length === 0) {
    return (
      <div className="p-8 text-center border rounded-lg bg-card">
        <h3 className="text-xl font-medium mb-2">No matches found</h3>
        <p className="text-muted-foreground">
          There are no upcoming matches for this league in the next two weeks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.keys(matchesByDate).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      }).map((dateKey) => (
        <div key={dateKey} className="mb-6">
          <h2 className="text-xl font-bold mb-4">{formatDateHeader(dateKey)}</h2>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 px-4">Time</TableHead>
                  <TableHead className="w-1/2 px-4">Home</TableHead>
                  <TableHead className="w-24 px-4 text-center">Score</TableHead>
                  <TableHead className="w-1/2 px-4">Away</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchesByDate[dateKey].map((match) => (
                  <TableRow key={match.id} className={getStatusClass(match)}>
                    <TableCell className="px-4 py-3">
                      <span className="status">{getStatusText(match)}</span>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center">
                        {match.homeTeam.crest && (
                          <img
                            src={match.homeTeam.crest}
                            alt={match.homeTeam.name || 'Home Team'}
                            className="w-6 h-6 mr-2"
                          />
                        )}
                        <span>{match.homeTeam.name || 'TBD'}</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-center font-bold">
                      {match.status === 'IN_PLAY' || match.status === 'FINISHED' ? (
                        <div className="flex items-center justify-center space-x-1">
                          <span
                            className={cn(
                              (match.score.fullTime.home ?? 0) > (match.score.fullTime.away ?? 0)
                                ? 'font-extrabold text-primary'
                                : 'text-muted-foreground'
                            )}
                          >
                            {match.score.fullTime.home ?? '0'}
                          </span>
                          <span>-</span>
                          <span
                            className={cn(
                              (match.score.fullTime.away ?? 0) > (match.score.fullTime.home ?? 0)
                                ? 'font-extrabold text-primary'
                                : 'text-muted-foreground'
                            )}
                          >
                            {match.score.fullTime.away ?? '0'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">vs</span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-end">
                        <span>{match.awayTeam.name || 'TBD'}</span>
                        {match.awayTeam.crest && (
                          <img
                            src={match.awayTeam.crest}
                            alt={match.awayTeam.name || 'Away Team'}
                            className="w-6 h-6 ml-2"
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeagueMatchTable;