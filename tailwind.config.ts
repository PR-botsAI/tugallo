import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          flame: "#FF4D2D",
          crimson: "#E11D48",
          rose: "#FB2A6B",
          amber: "#FF8A00",
          gold: "#FFB020",
          teal: "#06B6A4",
          ink: "#1B1024",
          slate: "#5B5566",
          cream: "#FFF8F3",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,16,36,.04), 0 12px 32px rgba(225,29,72,.08)",
        glow: "0 8px 30px rgba(255,77,45,.35)",
      },
      backgroundImage: {
        "brand-grad": "linear-gradient(120deg,#E11D48 0%,#FF4D2D 45%,#FF8A00 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
