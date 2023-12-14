import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import path from 'node:path';

export default defineConfig({
	plugins: [
		purgeCss(),
		paraglide({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
		sveltekit()
	],
	resolve: {
		alias: {
			// This is the alias you can use in your code
			// you can change it to whatever you want
			'$paraglide': path.resolve(__dirname, 'src/paraglide')
		}
	}
});
