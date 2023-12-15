<script lang="ts">
	// Modals

	import AddDocumentModal from './(left-menu)/(Modal)/AddDocumentModal.svelte';

	import type { PageData } from './$types';
	import { Modal, type ModalComponent } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		addDocumentModal: {
			ref: AddDocumentModal,
			props: { data: data }
		}
		// ...
	};

</script>

<Modal data={data} components={modalRegistry} />

<style lang="postcss">
</style>
