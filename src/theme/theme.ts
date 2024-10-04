import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e0f5f5", // Lightened slightly for a fresher tone
      100: "#b0e4e4",
      200: "#7ed2d2",
      300: "#4dc1c1",
      400: "#26b1b1", // Tweaked for a richer teal
      500: "#009a9a", // Slightly deeper primary color for modernity
      600: "#008a8a",
      700: "#007575", // Balanced teal for button hover effects
      800: "#006161",
      900: "#004646", // Darkened for navbar or footer backgrounds
    },
    secondary: {
      50: "#fff4e6", // Lightened for a warmer look
      100: "#ffe0b2",
      200: "#ffcb80",
      300: "#ffb24d",
      400: "#ff9f29", // Slightly refined orange for modern vibrancy
      500: "#ff8900", // Tweaked to give it a bold, striking feel
      600: "#e57a00",
      700: "#c36900", // Darker orange for hover and contrast
      800: "#9f5700",
      900: "#703c00", // Deep brownish-orange for footer or highlights
    },
    accent: {
      50: "#eaf3fc",
      100: "#c8ddf9",
      200: "#a6c8f6",
      300: "#84b2f3",
      400: "#5e9def", // Vibrant for strong accents
      500: "#2978e5", // Bolder and more modern for action elements
      600: "#256ace",
      700: "#205bb7",
      800: "#1a4a99",
      900: "#123474", // Dark navy blue for focus areas or bold text
    },
    neutral: {
      50: "#f7f7f7", // Slightly toned down for softer backgrounds
      100: "#eeeeee",
      200: "#dddddd", // Improved for better content readability
      300: "#cccccc",
      400: "#aaaaaa",
      500: "#888888", // Darkened for a cleaner look
      600: "#666666", // For borders and light text
      700: "#444444", // Ideal for body text
      800: "#222222", // Dark enough for contrast
      900: "#0f0f0f", // Near-black for strong emphasis or backgrounds
    },
  },
});

export default theme;
