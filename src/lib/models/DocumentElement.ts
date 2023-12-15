import { AssertionError } from '$lib/models/Error/AssertionError';

interface DocumentElementPlaceHolder {
	readonly icon: string;
	readonly name: string;
}

class DocumentElement {
	readonly id: string;
	readonly icon: string;
	readonly name: string;
	documents: Array<DocumentElement>;
	isExpanded: boolean;

	private static assertIdValid(id: string) {
		this.assertNotBlank('id', id);
		let length = id.length;
		if (length < 2) {
			throw new AssertionError({ message: 'id is too short !', actual: length, expected: 16 });
		}
	}

	private static assertNotBlank(key: string, value: string) {
		let length = value.length;
		if (length < 2) {
			throw new AssertionError({ message: `${key} is too short !`, actual: length, expected: 16 });
		}
	}

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	private constructor(id: string, icon: string, name: string, documents: Array<DocumentElement> = [], isExpanded: boolean = false) {
		DocumentElement.assertIdValid(id);
		DocumentElement.assertNotBlank('icon', icon);
		DocumentElement.assertNotBlank('name', name);
		this.id = id;
		this.icon = icon;
		this.name = name;
		this.documents = documents;
		this.isExpanded = isExpanded;
	}

	public static from(placeholder: DocumentElementPlaceHolder): DocumentElement {
		return new DocumentElement(DocumentElement.generateId(), placeholder.icon, placeholder.name);
	}

	private static generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substring(2);
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		const documents: string = `${this.documents.map((d) => d.toString())}`;
		return `${this.id}-${this.icon}-${this.name}-${documents}`;
	}

}

export { DocumentElement };
export type { DocumentElementPlaceHolder };