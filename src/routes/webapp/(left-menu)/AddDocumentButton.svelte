<script lang="ts">
	// i18n
	import * as m from '$paraglide/messages';

	//iconify
	import 'iconify-icon';

	//modal
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { DocumentElement, type DocumentElementRequiredFields } from '$lib/models/DocumentElement';
	import { log } from '$lib/scripts/debug-utilities';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	export let document: DocumentElement;

	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);

	const modalStore = getModalStore();

	const addDocument = (documentElement: DocumentElement): void => {
		log('DocumentElement:', documentElement);
		new Promise<DocumentElementRequiredFields>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				title: m.addDocumentModalTitle(),
				body: m.addDocumentModalDescription(),
				component: 'addDocumentModal',
				response: (r: DocumentElementRequiredFields) => {
					log('resolve:', resolve);
					log('r:', r);
					resolve(r);
				},
			};
			modalStore.trigger(modal);
		}).then((r: DocumentElementRequiredFields) => {
			log('resolved response:', r);
			// Ajouter l'objet retourné dans le Local Storage.
			log('Document node:', document);
			// Set the value
			document.documents.push(DocumentElement.from(r));
			log('MenuElements Store ', $menuElementStore);
			$menuElementStore = $menuElementStore;
		});
	};

</script>

<span class="actions">
	<button type="button"
					class="btn-icon btn-icon-sm variant-filled-surface hidden group-hover:block hover:variant-filled"
					on:click={() => addDocument(document)}>
		<iconify-icon icon="lucide:file-plus-2"></iconify-icon>
	</button>
</span>

<style lang="postcss">
    span.actions {

        button {
            font-size: 0.65rem;
            height: 1.3rem;
            width: 1.3rem;
        }
    }
</style>