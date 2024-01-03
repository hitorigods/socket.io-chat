import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				white: '#fff5ff',
				black: '#1a171a',
				primary: '#ffb900',
				secondary: '#f05',
				text: '#fff',
				dark: '#121218',
				line: '#801336',
				disabled: '#605f71',
			},
			fontFamily: {
				default: ['SF Mono', 'Noto Sans JP Variable', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
export default config;
