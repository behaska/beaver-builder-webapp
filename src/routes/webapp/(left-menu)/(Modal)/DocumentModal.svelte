<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import * as m from '$paraglide/messages';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { addDocumentElementSchema } from '$lib/schemas';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	// Stores
	import { getModalStore, ListBox, ListBoxItem, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { DocumentElementRequiredFields } from '$lib/models/DocumentElement';
	import type { DocumentModalResult, IconElement } from './DocumentModal';
	import { type Icon, IconifyProvider } from '$lib/icon/iconify-provider';

	$: console.log(JSON.stringify($modalStore));
	console.log('Modal !!!');

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

	const initialDocument: DocumentElementRequiredFields = $modalStore[0]?.meta != null ? {
		name: $modalStore[0].meta.name,
		icon: $modalStore[0].meta.icon,
	} : {
		name: '',
		icon: '',
	};

	function contains(icon: Icon, searchedIcon: string) {
		return icon.name.toLowerCase().includes(searchedIcon) || icon.icon.toLocaleLowerCase().includes(searchedIcon);
	}

	function makeIconSet(icons: Icon[], filter: string): IconElement[] {
		const effectiveFilter = filter.trim();
		if (effectiveFilter.length > 0) {
			return icons
				.filter(icon => contains(icon, searchedIcon))
				.map(icon => {
					return {
						label: icon.name,
						value: icon.icon,
					};
				});
		}
		return icons.map(icon => {
			return {
				label: icon.name,
				value: icon.icon,
			};
		});
	}

	let searchedIcon: string = '';
	let icons: IconElement[] = [];

	$ :  icons = makeIconSet(IconifyProvider.getIconSet(), searchedIcon);

	//SuperForms
	const { form, errors, enhance } =
		superForm(superValidateSync($modalStore[0].meta, addDocumentElementSchema), {
			SPA: true,
			validators: addDocumentElementSchema,
			validationMethod: 'auto',
			defaultValidator: 'clear',
			customValidity: true,
			taintedMessage: m.taintedMessage(),
			clearOnSubmit: 'message',
			multipleSubmits: 'prevent',
			onUpdate({ form }) {
				const newDocument: DocumentElementRequiredFields = {
					name: form.data.name,
					icon: form.data.icon,
				};
				if (form.valid && initialDocument !== newDocument) {
					const t: ToastSettings = {
						message: 'New Document has been created !',
						background: 'variant-filled-success',
						timeout: 2000,
					};
					toastStore.trigger(t);
					const result: DocumentModalResult = {
						isFormValid: true,
						document: newDocument,
					};
					$modalStore[0].response(result);
					parent.onClose();
				} else {
					$modalStore[0].response({ isFormValid: false });
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
			</label>

			<div class="card">
				<header class="card-header">
					<h2>Choose your icon</h2>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] mb-1">
						<div class="input-group-shim">
							<span class="iconify" data-icon="lucide:search"></span>
						</div>
						<input type="search" name="search" bind:value={searchedIcon} placeholder="Search..." />
					</div>
				</header>
				<div class="container max-h-32 mx-auto flex overflow-scroll">
					<section class="p-4h-full overflow-auto my-2 w-full">
						<ListBox>
							{#each icons as icon(icon.label)}
								<ListBoxItem bind:group={$form.icon} name="medium" value={icon.value}>
									<svelte:fragment slot="lead">
										<iconify-icon icon="lucide:{icon.value}"></iconify-icon>
									</svelte:fragment>
									{icon.label}
								</ListBoxItem>
							{/each}
						</ListBox>
					</section>
				</div>
				<footer class="card-footer">Icon selected :
					<iconify-icon icon="lucide:{$form.icon}"></iconify-icon>
					{$form.icon}
				</footer>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" type="button"
								on:click={parent.onClose}>{parent.buttonTextCancel}</button>
				<button class="btn {parent.buttonPositive}" type="submit">Submit Form</button>
			</footer>
		</form>
	</div>
{/if}