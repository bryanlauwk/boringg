import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: {
    border: "hsl(var(--border))",
    muted: "hsl(var(--muted))",
    primary: "hsl(var(--primary))",
  } } },
  plugins: [],
} satisfies Config;
