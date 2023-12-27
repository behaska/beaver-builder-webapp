<script lang="ts">
	//iconify
	import 'iconify-icon';

	//modal
	import { DocumentElement, type DocumentElementRequiredFields } from '$lib/models/DocumentElement';
	import { getModalStore, localStorageStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import * as m from '$paraglide/messages';
	import type { DocumentModalResult } from './(Modal)/DocumentModal';

	export let parent: DocumentElement;
	export let document: DocumentElement;

	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);

	const modalStore = getModalStore();

	const removeDocument = (): void => {
		new Promise<DocumentElementRequiredFields>((resolve) => {

			const modal: ModalSettings = {
				type: 'confirm',
				// Data
				title: m.removeDocumentModalTitle(),
				body: m.removeDocumentModalDescription(),
				// TRUE if confirm pressed, FALSE if cancel pressed
				response: (r: boolean) => {
					resolve(r);
				},
			};
			modalStore.trigger(modal);
		}).then((r: DocumentModalResult) => {
			if (r) {
				// Supprimer l'objet retourné dans le Local Storage.
				let rootDocuments = parent.documents;
				const index = rootDocuments.findIndex((d) => d.id === document.id);
				parent.documents.splice(index, 1);
				$menuElementStore = $menuElementStore;
			}
		});
	};

</script>

<div class="actions flex flex-row items-center mb-1">
	<button type="button"
					class="btn btn-sm variant-filled-surface"
					on:click={() => removeDocument()}>
		<span>
			<iconify-icon icon="lucide:file-minus-2"></iconify-icon>
		</span>
		<span class="ml-2">
			{m.removeActionMenu()}
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