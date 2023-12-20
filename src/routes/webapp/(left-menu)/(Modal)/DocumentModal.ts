import type { DocumentElementRequiredFields } from '$lib/models/DocumentElement';

interface DocumentModalResult {
	readonly isFormValid: boolean;
	readonly document: DocumentElementRequiredFields;
}

interface IconElement {
	readonly label: string;
	readonly value: string;
}

export type { DocumentModalResult, IconElement };