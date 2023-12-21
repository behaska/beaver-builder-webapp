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
	import { listIcons } from 'iconify-icon';

	const documentRoot = DocumentElement.from('Documents', 'file-text');
	const templateRoot = DocumentElement.from('Templates', 'layout-template');
	// Document Element Store
	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', [
		documentRoot, templateRoot,
	]);

</script>

<nav class="p-4">
	<section id="documents" class="flex flex-row group">
			<span class="title">
				<iconify-icon icon="lucide:file-text"></iconify-icon>
				{m.documents()}
			</span>
		<AddDocumentButton bind:document={$menuElementStore[0]} />
	</section>
	<ul class="flex flex-col">
		{#each $menuElementStore[0].documents as document}
			<DocumentElementComponent bind:parent={$menuElementStore[0]} bind:document={document} />
		{/each}
	</ul>
	<section id="templates" class="flex flex-row group">
			<span>
				<iconify-icon icon="lucide:layout-template"></iconify-icon>
				{m.templates()}
			</span>
		<a href="/templates" on:click={drawerClose}>
		</a>
	</section>
</nav>

<style lang="postcss">
    nav {
        height: 100%;
    }

    section#documents {
        min-height: 50%;
    }

    li {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 2rem;

        span.title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-left: 0.2rem;
            margin-bottom: 2rem;
        }
    }
</style>