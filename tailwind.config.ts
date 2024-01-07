import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
				gray: '#2f3d4b',
				dark: '#121218',
				line: '#801336',
				disabled: '#787c8b',
				disabled_dark: '#2f3d4b',
				danger: '#d9122c',
				danger_light: '#d9122c',
				danger_dark: '#970009',
			},
			fontFamily: {
				display: ['SF Mono', 'var(--font-noto-sans-jp)', 'sans-serif'],
				sans: ['SF Mono', 'var(--font-noto-sans-jp)', 'sans-serif'],
				logo: ['Deorme', 'sans-serif'],
				heading: ['Deorme', 'sans-serif'],
				Deorme: ['Deorme', 'sans-serif'],
				goblin: ['var(--font-goblin-one)', 'sans-serif'],
			},
			spacing: {
				default: '20px',
				xs: '10px',
				sm: '15px',
				md: '20px',
				lg: '30px',
				content: '50px',
			},
			sizeing: {
				header: '70px',
				footer: '50px',
			},
			fontFace: {
				Noto_Sans_JP: [
					{
						filename: 'meta-ot-bold-italic',
						style: 'italic',
						weight: 700,
						display: 'auto',
					},
					{
						filename: 'meta-ot-regular',
					},
				],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
export default config;
