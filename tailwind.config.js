/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: "#050505",
                    secondary: "#111111",
                    tertiary: "#181818",
                },
                accent: {
                    teal: "#0E3A53",
                    "teal-light": "#1A5C83",
                    green: "#0F3D2E",
                    "green-light": "#1A6B4E",
                },
                border: {
                    subtle: "#1F1F1F",
                    DEFAULT: "#2A2A2A",
                    strong: "#3A3A3A",
                },
                text: {
                    primary: "#F0F0F0",
                    secondary: "#A0A0A0",
                    muted: "#606060",
                    accent: "#5BA3C9",
                },
            },
            fontFamily: {
                heading: ["var(--font-jakarta)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains)", "monospace"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                float: "float 6s ease-in-out infinite",
                pulse: "pulse 4s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            backgroundImage: {
                "radial-glow":
                    "radial-gradient(ellipse at center, rgba(14,58,83,0.15) 0%, transparent 70%)",
                "radial-glow-green":
                    "radial-gradient(ellipse at center, rgba(15,61,46,0.15) 0%, transparent 70%)",
            },
        },
    },
    plugins: [],
};
