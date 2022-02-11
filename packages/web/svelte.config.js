// import adapter from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				(function LoadSecrets() {
					return {
						name: 'load-secrets',
						configureServer: async () => {
							(await import('dotenv')).config();
						}
					};
				})()
			]
		}
	}
};

export default config;
