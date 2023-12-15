<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// SuperForm
	import type { PageData } from '../../$types';

	export let data: PageData;

	// Modal
	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';

	import AddDocumentForm from './AddDocumentForm.svelte';

</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<AddDocumentForm data={data.addDocumentForm} parent={parent} />
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">

		</footer>
	</div>
{/if}
