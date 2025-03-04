import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Initialize theme based on localStorage or system preference
function initializeTheme() {
  // Check if user has previously set a theme
  const storedTheme = localStorage.getItem("theme");
  
  // Use stored theme or detect system preference
  const theme = storedTheme || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
  
  // Apply theme to document
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  
  // Store the chosen theme
  localStorage.setItem("theme", theme);
}

// Run theme initialization
initializeTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
