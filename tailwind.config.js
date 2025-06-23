/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
          },
          "33%": {
            transform: "translate(50px, -70px) scale(1.2) rotate(30deg)",
          },
          "66%": {
            transform: "translate(-40px, 40px) scale(0.8) rotate(-20deg)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeInScale: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        bounceIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
          "70%": {
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        blob: "blob 10s infinite ease-in-out",
        "blob-delay-2000": "blob 10s infinite ease-in-out 2s",
        "blob-delay-4000": "blob 10s infinite ease-in-out 4s",
        fadeInUp: "fadeInUp 0.6s ease-out",
        fadeIn: "fadeIn 0.6s ease-out",
        fadeInScale: "fadeInScale 0.6s ease-out",
        bounceIn: "bounceIn 0.6s ease-out",
      },
      animationDelay: {
        200: "200ms",
        400: "400ms",
      },
    },
  },
  plugins: [],
};
