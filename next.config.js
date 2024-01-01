require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		isProd: String(isProd),
	},
	transpilePackages: ['jotai-devtools'],
};

module.exports = nextConfig;
