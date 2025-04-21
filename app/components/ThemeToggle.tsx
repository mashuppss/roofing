// filepath: /Users/zeesean/Documents/roofreplacement/roof-replacement-20/roof-replacements-llc/app/components/ThemeToggle.tsx
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

// Simple icons for demonstration (replace with actual icons later)
const SunIcon = () => <span>☀️</span>;
const MoonIcon = () => <span>🌙</span>;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid rendering toggle until mounted
  if (!isMounted) {
    return <div className="w-6 h-6"></div>; // Placeholder for size
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}