// filepath: /Users/zeesean/Documents/roofreplacement/roof-replacement-20/roof-replacements-llc/app/components/ThemeProvider.tsx
'use client'; // Required for components using hooks like useState, useEffect

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

// Define props for *our* component, including children
interface CustomThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

// Use the custom props type here
export default function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    // You could return null or a loading skeleton here
    return null;
  }

  // Pass the rest of the props (which match ThemeProviderProps) to NextThemesProvider
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}