// frontend/src/components/LeagueNavigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const leagues = [
  {
    name: "Premier League",
    path: "/premierleague",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png",
    country: "England"
  },
  {
    name: "La Liga",
    path: "/laliga",
    logo: "https://logowik.com/content/uploads/images/laliga6363.logowik.com.webp",
    country: "Spain"
  },
  {
    name: "Bundesliga",
    path: "/bundesliga",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/800px-Bundesliga_logo_%282017%29.svg.png",
    country: "Germany"
  },
  {
    name: "Serie A",
    path: "/seriea",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbnCGdtHO203OHmuKsyCZlYP1d2FXNi_19Q&s",
    country: "Italy"
  },
  {
    name: "Ligue 1",
    path: "/ligue1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Ligue1_logo.png",
    country: "France"
  }
];

export function LeagueNavigation() {
  const location = useLocation();
  
  return (
    <div className="h-[calc(100vh-5rem)] sticky top-20 left-0 w-56 flex-shrink-0 border-r bg-card">
      <div className="pt-2 px-1">
        <Link 
          to="/"
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors w-full",
            location.pathname === "/" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          )}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
          </svg>
          All Matches
        </Link>
        
        {leagues.map((league) => (
          <Link 
            key={league.path}
            to={league.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors mt-1 w-full",
              location.pathname === league.path 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <img 
              src={league.logo} 
              alt={`${league.name} logo`}
              className="w-5 h-5 object-contain" 
            />
            {league.name}
          </Link>
        ))}
      </div>
    </div>
  );
}