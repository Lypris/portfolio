"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const [mounted, setMounted] = React.useState(false);

  // S'assurer que le composant est monté du côté client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Éviter de rendre quoi que ce soit jusqu'à ce que le composant soit monté
  }
  
  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className="p-2 rounded-full bg-background focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-foreground hover:text-primary">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
        
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary hover:text-foreground">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      )}
    </button>
  )
}

