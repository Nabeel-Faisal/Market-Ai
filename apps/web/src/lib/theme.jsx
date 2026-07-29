import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'marketai-theme';

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage can throw in private mode — fall through to the media query
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Applies the theme class to <html>. The initial paint is handled by the inline
 * bootstrap script in index.html, so this only reconciles later changes.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#05070f' : '#f7f9fc');

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Persistence is best-effort
    }
  }, [theme]);

  // Follow the OS only while the visitor has never made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* ignore */
      }
      setThemeState(event.matches ? 'light' : 'dark');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState((current) => (typeof next === 'function' ? next(current) : next));
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
