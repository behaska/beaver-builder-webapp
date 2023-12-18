<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import * as m from '$paraglide/messages';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { addDocumentElementSchema } from '$lib/schemas';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	// Stores
	import { getModalStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { DocumentElement } from '$lib/models/DocumentElement';

	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);

	const toastStore = getToastStore();
	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Modal
	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	const cFormError = 'text-red-500';
	const cHeader = 'text-2xl font-bold';

	//SuperForms
	const { form, errors, enhance } =
		superForm(superValidateSync(addDocumentElementSchema), {
			SPA: true,
			validators: addDocumentElementSchema,
			validationMethod: 'auto',
			defaultValidator: 'clear',
			customValidity: true,
			taintedMessage: m.taintedMessage(),
			clearOnSubmit: 'message',
			multipleSubmits: 'prevent',
			onUpdate({ form }) {
				if (form.valid) {
					// Set the value
					$menuElementStore = [
						DocumentElement.from(form.data.name, form.data.icon),
						...$menuElementStore,
					];
					console.log('MenuElements Store ', $menuElementStore);
					const t: ToastSettings = {
						message: 'Form is valid ...',
						background: 'variant-filled-success',
						timeout: 2000,
					};
					toastStore.trigger(t);
					parent.onClose();
				}
			},
		});

</script>

<!-- @component This example creates a simple form modal. -->
{#if $modalStore[0]}

	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<SuperDebug
			data={$form}
			display={true}
			status={true}
			label=''
			collapsible={false}
			collapsed={false}
			stringTruncate={120}
			raw={false}
			functions={false}
			theme='default'
			ref={HTMLPreElement}
		/>
		<!-- Enable for debugging: -->
		<form method="POST" use:enhance class="modal-form {cForm}">
			<label class="label">
				<span>{m.addDocumentModalNameField()}</span>
				<input id="name" name="name" class="input" type="text" bind:value={$form.name}
							 placeholder={m.addDocumentModalNamePlaceHolder()} />
				{#if $errors.name}
					<small class="{cFormError}">{$errors.name}</small>
				{/if}
			</label>
			<label class="label">
				<span>{m.addDocumentModalIconField()}</span>
				<input id="icon" name="icon" class="input" type="text" bind:value={$form.icon}
							 placeholder={m.addDocumentModalIconPlaceHolder()} />
				{#if $errors.icon}
					<small class="{cFormError}">{$errors.icon}</small>
				{/if}
			</label>
			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" type="button"
								on:click={parent.onClose}>{parent.buttonTextCancel}</button>
				<button class="btn {parent.buttonPositive}" type="submit">Submit Form</button>
			</footer>
		</form>
	</div>
{/if}
