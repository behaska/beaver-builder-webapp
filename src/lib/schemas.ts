import { z } from 'zod';
import * as m from '$paraglide/messages';

export const addDocumentElementSchema = z.object({
	name: z.string({ required_error: m.fieldRequired({ name: 'Name' }) })
		.min(1, { message: m.fieldRequired({ name: 'Name' }) })
		.max(75, { message: m.fieldTooLong({ name: 'Name', size: 75 }) })
		.trim(),
	icon: z.string()
		.min(3, { message: m.fieldTooShort({ name: 'Icon', size: 3 }) })
		.max(50, { message: m.fieldTooLong({ name: 'Icon', size: 50 }) })
		.trim(),
});

export type AddDocumentElementSchema = typeof addDocumentElementSchema;