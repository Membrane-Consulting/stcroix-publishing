import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
// 		target: '#svelte',
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
