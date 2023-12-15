<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		const newDocumentElement: DocumentElement = DocumentElement.from(placeholder);
		if ($modalStore[0].response) $modalStore[0].response(newDocumentElement);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	// i18n
	import * as m from '$paraglide/messages';
	import {
		DocumentElement,
		type DocumentElementPlaceHolder
	} from '$lib/models/DocumentElement';

	// FormData
	let placeholder: DocumentElementPlaceHolder = {
		icon: '',
		name: ''
	};

</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>{m.addDocumentModalNameField()}</span>
				<input class="input" type="text" bind:value={placeholder.name}
							 placeholder={m.addDocumentModalNamePlaceHolder()} />
			</label>
			<label class="label">
				<span>{m.addDocumentModalIconField()}</span>
				<input class="input" type="text" bind:value={placeholder.icon}
							 placeholder={m.addDocumentModalIconPlaceHolder()} />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
		</footer>
	</div>
{/if}
