import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const addDocumentSchema = z.object({
	name: z.string().min(1).max(75).trim(),
	icon: z.string().min(5).max(50).trim()
});

export const load = async (event) => {
	// Server API:
	const addDocumentForm = await superValidate(event, addDocumentSchema);

	// Unless you throw, always return { form } in load and form actions.
	return { addDocumentForm };
};

export const actions = {
	default: async ({ request }) => {
		const addDocumentForm = await superValidate(request, addDocumentSchema);
		console.log('POST', addDocumentForm);

		if (!addDocumentForm.valid) {
			return fail(400, { addDocumentForm });
		}

		// TODO: Do something with the validated form.data

		return { addDocumentForm };
	}
};