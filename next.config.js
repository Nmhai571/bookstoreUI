/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"api.lorem.space",
			"encrypted-tbn0.gstatic.com",
			"images.unsplash.com",
			"bizweb.dktcdn.net",
			"res.cloudinary.com",
		],
	},
	reactStrictMode: true,
	swcMinify: true,
	env: {
		APP_URL: process.env.APP_URL,
		API_URL: process.env.API_URL,
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
		PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
		NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	},
};

module.exports = nextConfig;
