import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090A0F",
        surface: {
          DEFAULT: "#12141D",
          hover: "#181B26",
          active: "#1E2230",
          card: "#12141D",
          input: "#0F1118",
        },
        border: {
          DEFAULT: "#1F2430",
          subtle: "#181C26",
          accent: "#2A3142",
        },
        text: {
          primary: "#F3F4F6",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        vice: {
          coral: "#FF2E93",
          coralMuted: "rgba(255, 46, 147, 0.15)",
          cyan: "#00F0FF",
          cyanMuted: "rgba(0, 240, 255, 0.15)",
          purple: "#9D4EDD",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        glowCyan: "0 0 25px -5px rgba(0, 240, 255, 0.25)",
        glowCoral: "0 0 25px -5px rgba(255, 46, 147, 0.25)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulseSlow: "pulseSlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

