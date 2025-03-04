import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ui/theme-toggle';
import { LeagueNavigation } from './LeagueNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen">
    {/* Header */}
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold hover:text-primary transition-colors">
          Football Stats
        </Link>
        <ThemeToggle />
      </div>
    </header>
    
    {/* Main content with sidebar */}
    <div className="flex">
      {/* Sidebar Navigation */}
      <LeagueNavigation />
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
