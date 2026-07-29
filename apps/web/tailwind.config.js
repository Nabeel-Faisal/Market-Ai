/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Satoshi"', "system-ui", "sans-serif"],
        sans: ['"Satoshi"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        // Legacy aliases kept so nothing breaks mid-migration
        space: ['"Clash Display"', "system-ui", "sans-serif"],
        sora: ['"Clash Display"', "system-ui", "sans-serif"],
        poppins: ['"Satoshi"', "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          soft: "hsl(var(--brand) / 0.12)",
          cyan: "hsl(var(--brand-cyan))",
          violet: "hsl(var(--brand-violet))",
          pink: "hsl(var(--brand-pink))",
          lime: "hsl(var(--brand-lime))",
          amber: "hsl(var(--brand-amber))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)",
        "3xl": "calc(var(--radius) + 18px)",
      },
      boxShadow: {
        soft: "0 1px 2px hsl(var(--shadow-color) / 0.05), 0 8px 24px -12px hsl(var(--shadow-color) / 0.18)",
        lifted:
          "0 2px 4px hsl(var(--shadow-color) / 0.06), 0 24px 48px -20px hsl(var(--shadow-color) / 0.28)",
        ring: "0 0 0 1px hsl(var(--border))",
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float-rotate": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%, -8%, 0) scale(1.15)" },
          "66%": { transform: "translate3d(-6%, 6%, 0) scale(0.92)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        beam: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(300%)", opacity: "0" },
        },
        "caret-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.22,1,0.36,1)",
        "fade-in": "fade-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "slide-up": "slide-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "float-rotate": "float-rotate 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        shimmer: "shimmer 2.2s infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        beam: "beam 4s ease-in-out infinite",
        "caret-blink": "caret-blink 1.1s steps(2) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
