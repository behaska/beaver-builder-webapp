import type { JSONContent } from '@tiptap/core';

class TipTapDocumentElement {
	readonly id: string;
	content: JSONContent;

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	private constructor(id: string, content: JSONContent) {
		this.id = id;
		this.content = content;
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return `${this.id}-${this.content}`;
	}

}

export { TipTapDocumentElement };