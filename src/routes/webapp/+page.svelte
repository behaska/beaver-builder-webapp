<script lang="ts">
	// Modal
	import { getModalStore, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import DocumentModal from './(left-menu)/(Modal)/DocumentModal.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		documentModal: {
			ref: DocumentModal,
		},
		// ...
	};


	const modalStore = getModalStore();
	$: console.log(JSON.stringify($modalStore));
	$: console.log(JSON.stringify(modalRegistry));

</script>

<Modal components={modalRegistry} />

<h1>Beaver Builder WebApp</h1>

<style lang="postcss">
    h1 {
        padding: 5rem;
        width: auto;
    }
</style>
