<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	// i18n
	import * as m from '$paraglide/messages';

	//iconify
	import 'iconify-icon';

	//modal
	import { DocumentElement } from '$lib/models/DocumentElement';
	import DocumentElementComponent from './DocumentElementComponent.svelte';
	import AddDocumentButton from './AddDocumentButton.svelte';

	const documentRoot = DocumentElement.from('Documents', 'file-text');
	const templateRoot = DocumentElement.from('Templates', 'layout-template');
	// Document Element Store
	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', [
		documentRoot, templateRoot,
	]);

	// Popup
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom',
	};

</script>

<nav class="list-nav m-0 p-0">
	<ul>
		<li id="documents" class="flex flex-row group/document items-center">
			<span class="flex ml-2 mr-1">
				<iconify-icon icon="lucide:file-text"></iconify-icon>
			</span>
			<span class="flex-auto">{m.documents()}</span>
			<span class="invisible group-hover/document:visible">
				<button type="button" class="btn-icon btn-icon-sm variant-filled-surface"
								use:popup={popupFeatured}>
					<span class="iconify" data-icon="lucide:menu"></span>
				</button>
			</span>

			<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
				<div><p>Actions</p></div>
				<div class="arrow bg-surface-100-800-token" />
				<AddDocumentButton bind:document={$menuElementStore[0]} />
			</div>

		</li>
		<ul class="list-nav flex flex-col">
			{#each $menuElementStore[0].documents as document}
				<DocumentElementComponent bind:parent={$menuElementStore[0]} bind:document={document} />
			{/each}
		</ul>
		<li id="templates" class="flex flex-row group">
			<span>
				<iconify-icon icon="lucide:layout-template"></iconify-icon>
				{m.templates()}
			</span>
			<a href="/templates" on:click={drawerClose}>
			</a>
		</li>
	</ul>
</nav>

<style lang="postcss">
    nav {
        height: 100%;

        button {
            padding: 0;
            margin: 0;
        }
    }
</style>