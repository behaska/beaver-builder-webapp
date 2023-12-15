<script lang="ts">
	// SuperForm
	import type { PageData } from './$types';

	export let data: PageData;

	// Modal
	import { Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import AddDocumentModal from './(left-menu)/(Modal)/AddDocumentModal.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		addDocumentModal: {
			ref: AddDocumentModal,
			props: { data: data },
		},
		// ...
	};

</script>

<Modal components={modalRegistry} />

<h1>Beaver Builder WebApp</h1>

<style lang="postcss">
    h1 {
        padding: 5rem;
        width: auto;
    }
</style>
