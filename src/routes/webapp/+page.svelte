<script lang="ts">
	// Modal
	import { Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import AddDocumentModal from './(left-menu)/(Modal)/AddDocumentModal.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		addDocumentModal: {
			ref: AddDocumentModal,
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
