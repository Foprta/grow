import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import { optimizeCss } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({ out: 'build' }),
		target: '#svelte',
		router: true,
		ssr: true,
		hydrate: true,
		trailingSlash: 'never',
		amp: false,
		vite: {
			plugins: [process.env.NODE_ENV === 'production' && optimizeCss()]
		}
	}
};

export default config;
