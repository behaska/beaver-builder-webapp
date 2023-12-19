<script lang="ts">
	// i18n
	import * as m from '$paraglide/messages';

	//iconify
	import 'iconify-icon';

	//modal
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { DocumentElement, type DocumentElementRequiredFields } from '$lib/models/DocumentElement';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import { log } from '$lib/scripts/debug-utilities';

	export let parent: DocumentElement;
	export let document: DocumentElement;

	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);

	const modalStore = getModalStore();

	const updateDocument = (): void => {
		new Promise<DocumentElementRequiredFields>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				title: m.updateDocumentModalTitle(),
				body: m.updateDocumentModalDescription(),
				component: 'addDocumentModal',
				meta: { name: document.name, icon: document.icon },
				response: (r: DocumentElementRequiredFields) => {
					resolve(r);
				},
			};
			modalStore.trigger(modal);
		}).then((r: DocumentElementRequiredFields) => {
			// Ajouter l'objet retourné dans le Local Storage.
			log('parent:', parent);
			let rootDocuments = parent.documents;
			log('rootDocuments:', rootDocuments);
			const index = rootDocuments.findIndex((d) => d.id === document.id);
			log('index:', index);
			log('document to updated:', parent.documents[index]);
			parent.documents.splice(index, 1, DocumentElement.from(r));
			$menuElementStore = $menuElementStore;
			$menuElementStore = $menuElementStore;
		});
	};

</script>

<span class="actions">
	<button type="button"
					class="btn-icon btn-icon-sm variant-filled-surface hidden group-hover:block hover:variant-filled"
					on:click={() => updateDocument()}>
		<iconify-icon icon="lucide:clipboard-edit"></iconify-icon>
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