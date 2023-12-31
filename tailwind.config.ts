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
				white: '#ffffff',
				primary: '#EE4540',
				secondary: '#C72C41',
				text: '#fff',
				bg: '#2D132C',
				line: '#801336',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
export default config;
