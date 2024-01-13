require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL);
const SUPABASE_URL = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		isProd: String(isProd),
	},
	images: {
		domains: [
			'localhost',
			'127.0.0.1',
			SITE_URL.hostname,
			SUPABASE_URL.hostname,
		],
	},
	transpilePackages: ['jotai-devtools'],
};

module.exports = nextConfig;
