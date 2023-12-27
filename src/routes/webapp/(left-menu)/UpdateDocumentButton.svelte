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
	import type { DocumentModalResult } from './(Modal)/DocumentModal';

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
				component: 'documentModal',
				meta: { name: document.name, icon: document.icon },
				response: (r: DocumentElementRequiredFields) => {
					resolve(r);
				},
			};
			modalStore.trigger(modal);
		}).then((r: DocumentModalResult) => {
			if (r.isFormValid) {
				// Ajouter l'objet retourné dans le Local Storage.
				let rootDocuments = parent.documents;
				const index = rootDocuments.findIndex((d) => d.id === document.id);
				parent.documents.splice(index, 1, DocumentElement.from(r.document));
				$menuElementStore = $menuElementStore;
			}
		});
	};

</script>

<div class="actions flex flex-row items-center mb-1">
	<button type="button"
					class="btn btn-sm variant-filled-surface"
					on:click={() => updateDocument()}>
		<span>
			<iconify-icon icon="lucide:clipboard-edit"></iconify-icon>
		</span>
		<span class="ml-2">
			{m.updateActionMenu()}
	</span>
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