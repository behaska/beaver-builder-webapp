import { z } from 'zod';

export const addDocumentElementSchema = z.object({
	name: z.string().min(1).max(75).trim(),
	icon: z.string().min(5).max(50).trim()
});

export type AddDocumentElementSchema = typeof addDocumentElementSchema;