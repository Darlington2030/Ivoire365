/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ci-orange": "var(--ci-orange)",
        "ci-orange-dark": "var(--ci-orange-dark)",
        "ci-green": "var(--ci-green)",
        "ci-green-dark": "var(--ci-green-dark)",
        "ci-white": "var(--ci-white)",
        "ci-ivory": "var(--ci-ivory)",
        "ci-charcoal": "var(--ci-charcoal)",
        "ci-gray": "var(--ci-gray)",
        "ci-border": "var(--ci-border)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "10px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(31, 36, 33, 0.04), 0 1px 6px 0 rgba(31, 36, 33, 0.05)",
        "card-hover": "0 2px 4px 0 rgba(31, 36, 33, 0.06), 0 4px 12px 0 rgba(31, 36, 33, 0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
