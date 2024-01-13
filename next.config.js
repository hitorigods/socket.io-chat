require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		isProd: String(isProd),
	},
	images: {
		domains: ['127.0.0.1', process.env.NEXT_PUBLIC_SITE_URL],
	},
	transpilePackages: ['jotai-devtools'],
};

module.exports = nextConfig;
