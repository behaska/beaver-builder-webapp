import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { addDocumentElementSchema } from '$lib/schemas';

export const load = async (event) => {
	// Server API:
	const addDocumentForm = await superValidate(event, addDocumentElementSchema);
	console.log('superValidate', addDocumentForm);

	// Unless you throw, always return { form } in load and form actions.
	return { addDocumentForm };
};

export const actions = {
	default: async ({ request }) => {
		const addDocumentForm = await superValidate(request, addDocumentElementSchema);
		console.log('POST', addDocumentForm);

		if (!addDocumentForm.valid) {
			return fail(400, { addDocumentForm });
		}

		// TODO: Do something with the validated form.data

		return { addDocumentForm };
	},
};