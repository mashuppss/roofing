// filepath: /Users/zeesean/Documents/roofreplacement/roof-replacement-20/roof-replacements-llc/app/components/ThemeProvider.tsx
'use client'; // Required for components using hooks like useState, useEffect

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid rendering theme-dependent UI until mounted on the client
  if (!isMounted) {
    // Render children directly or a placeholder to avoid layout shifts
    // Returning null might cause hydration errors if server/client mismatch
     return <>{children}</>;
    // Alternatively, render a basic structure matching the server render
    // return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}