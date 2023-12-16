<script lang="ts">
	import * as m from '$paraglide/messages';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { AddDocumentElementSchema } from '$lib/schemas';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { SvelteComponent } from 'svelte';

	// CSS
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	//SuperForms
	export let data: SuperValidated<AddDocumentElementSchema>;
	export let parent: SvelteComponent;

	const { form, errors, enhance } = superForm(data);

	console.log('Data in form:', data);
	console.log('form in form:', $form);
	console.log('Errors in form:', $errors);
	console.log('enhance in form:', enhance);

</script>

<SuperDebug data={$form} />

<!-- Component HTML -->
<form method="POST" use:enhance class="modal-form {cForm}">
	<label class="label">
		<span>{m.addDocumentModalNameField()}</span>
		<input id="name" name="name" class="input" type="text" bind:value={$form.name}
					 placeholder={m.addDocumentModalNamePlaceHolder()} />
		{#if $errors.name}
			<small>{$errors.name}</small>
		{/if}
	</label>
	<label class="label">
		<span>{m.addDocumentModalIconField()}</span>
		<input id="icon" name="icon" class="input" type="text" bind:value={$form.icon}
					 placeholder={m.addDocumentModalIconPlaceHolder()} />
		{#if $errors.icon}
			<small>{$errors.icon}</small>
		{/if}
	</label>
	<button class="btn {parent.buttonNeutral}" type="button" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
	<button class="btn {parent.buttonPositive}" type="submit">Submit Form</button>
</form>


<style lang="postcss">
    form {
        padding: 0;
    }
</style>