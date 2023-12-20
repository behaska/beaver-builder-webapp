import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import flowbite from 'flowbite/plugin';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { beaverBuilder } from './src/beaverBuilder';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite/**/*.js',
		join(require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		flowbite,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
					{
						name: 'vintage',
						enhancements: true,
					},
					{
						name: 'crimson',
						enhancements: true,
					},
				],
				custom: [
					beaverBuilder,
				],
			},
		}),
	],
	variants: {
		extend: {
			display: ['group-hover'],
		},
	},
} satisfies Config;
