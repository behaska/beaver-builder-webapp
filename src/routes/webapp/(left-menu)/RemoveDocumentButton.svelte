<script lang="ts">
	//iconify
	import 'iconify-icon';

	//modal
	import { DocumentElement } from '$lib/models/DocumentElement';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import { log } from '$lib/scripts/debug-utilities';

	export let parent: DocumentElement;
	export let document: DocumentElement;

	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);


	const removeDocument = (): void => {
		// Ajouter l'objet retourné dans le Local Storage.
		log('parent:', parent);
		let rootDocuments = parent.documents;
		log('rootDocuments:', rootDocuments);
		const index = rootDocuments.findIndex((d) => d.id === document.id);
		log('index:', index);
		log('document to delete:', parent.documents[index]);
		parent.documents.splice(index, 1);
		$menuElementStore = $menuElementStore;
	};

</script>

<span class="actions">
	<button type="button"
					class="btn-icon btn-icon-sm variant-filled-surface hidden group-hover:block hover:variant-filled"
					on:click={() => removeDocument()}>
		<iconify-icon icon="lucide:file-minus-2"></iconify-icon>
	</button>
</span>

<style lang="postcss">
    span.actions {

        button {
            font-size: 0.9rem;
            height: 1.4rem;
            width: 1.4rem;
        }
    }
</style>