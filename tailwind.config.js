module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Monument-Grotesk"],
    },
    extend: {
      colors: {
        transferGray: "#f2f2f2",
        transferPurple: "#9710ab",
      },
    },
  },
  plugins: [],
};
