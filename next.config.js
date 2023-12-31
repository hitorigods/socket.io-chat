require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		isProd: isProd,
	},
	transpilePackages: ['jotai-devtools'],
};

module.exports = nextConfig;
