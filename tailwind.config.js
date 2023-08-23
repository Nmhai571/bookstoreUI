module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "639px" },
		},
		extend: {
			aspectRatio: {
				"5/2": "5 / 2",
				"3/4": "3 / 4",
				"3/5": "3 / 5",
			},
			maxWidth: {
				"8xl": "88rem",
				"9xl": "96rem",
			},
			backgroundImage: {
				contact: "url('/contact.png')",
			},
		},
	},
	daisyui: {
		themes: [
			{
				book: {
					primary: "#9333ea",
					"primary-content": "#fff",
					secondary: "#ff764c",
					accent: "#37CDBE",
					neutral: "#3D4451",
					"base-100": "#FFFFFF",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
			"dark",
		],
	},
	plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
