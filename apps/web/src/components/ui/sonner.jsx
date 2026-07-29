import { Toaster as Sonner } from 'sonner';
import { useTheme } from '@/lib/theme.jsx';

/**
 * Toaster — wired to the site's own theme provider so toasts follow the
 * header toggle rather than the OS setting.
 */
const Toaster = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[hsl(var(--surface))] group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:rounded-2xl group-[.toaster]:shadow-lifted',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
