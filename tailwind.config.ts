import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        loaderBox1: {
          "0%": { transform: "translate(100%, 0)" },
          "50%": { transform: "translate(100%, 0)" },
          "100%": { transform: "translate(200%, 0)" },
        },
        loaderBox2: {
          "0%": { transform: "translate(0, 100%)" },
          "50%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(100%, 0)" },
        },
        loaderBox3: {
          "0%": { transform: "translate(100%, 100%)" },
          "50%": { transform: "translate(100%, 100%)" },
          "100%": { transform: "translate(0, 100%)" },
        },
        loaderBox4: {
          "0%": { transform: "translate(200%, 0)" },
          "50%": { transform: "translate(200%, 100%)" },
          "100%": { transform: "translate(100%, 100%)" },
        },
      },
      animation: {
        moveBox1: "loaderBox1 800ms linear infinite",
        moveBox2: "loaderBox2 800ms linear infinite",
        moveBox3: "loaderBox3 800ms linear infinite",
        moveBox4: "loaderBox4 800ms linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
