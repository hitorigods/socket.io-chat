require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		isProd: isProd,
	},
};

module.exports = nextConfig;
