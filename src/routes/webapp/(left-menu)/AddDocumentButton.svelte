<script lang="ts">
	// i18n
	import * as m from '$paraglide/messages';

	//iconify
	import 'iconify-icon';

	//modal
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { DocumentElement } from '$lib/models/DocumentElement';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import type { DocumentModalResult } from './(Modal)/DocumentModal';

	export let document: DocumentElement;

	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);

	const modalStore = getModalStore();

	const addDocument = (): void => {
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				title: m.addDocumentModalTitle(),
				body: m.addDocumentModalDescription(),
				component: 'documentModal',
				response: (r: boolean) => {
					resolve(r);
				},
			};
			modalStore.trigger(modal);
		}).then((r: DocumentModalResult) => {
			if (r.isFormValid) {
				// Ajouter l'objet retourné dans le Local Storage.
				document.documents.push(DocumentElement.from(r.document));
				$menuElementStore = $menuElementStore;
			}
		});
	};

</script>

<div class="actions">
	<button type="button"
					class="btn-icon btn-icon-sm variant-filled-surface hidden group-hover:block hover:variant-filled"
					on:click={() => addDocument()}>
		<iconify-icon icon="lucide:file-plus-2"></iconify-icon>
	</button>
</div>

<style lang="postcss">
    span.actions {

        button {
            font-size: 0.9rem;
            height: 1.4rem;
            width: 1.4rem;
        }
    }
</style>