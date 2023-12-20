import type { DocumentElementRequiredFields } from '$lib/models/DocumentElement';

interface DocumentModalResult {
	readonly isFormValid: boolean;
	readonly document: DocumentElementRequiredFields;
}

export type { DocumentModalResult };