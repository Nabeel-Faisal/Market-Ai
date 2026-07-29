import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme.jsx';

/**
 * ThemeToggle — swaps the palette with a rotating icon crossfade.
 */
const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border bg-[hsl(var(--glass-bg)/var(--glass-alpha))] backdrop-blur transition-colors duration-300 hover:border-brand/50',
        className
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? (
            <Moon className="h-[18px] w-[18px] text-brand-cyan" />
          ) : (
            <Sun className="h-[18px] w-[18px] text-brand-amber" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
