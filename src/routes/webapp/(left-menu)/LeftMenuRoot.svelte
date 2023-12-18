<script lang="ts">
	import { getDrawerStore, type ModalSettings } from '@skeletonlabs/skeleton';
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
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { DocumentElement } from '$lib/models/DocumentElement';

	const modalStore = getModalStore();

	const addDocument = (): void => {
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				title: m.addDocumentModalTitle(),
				body: m.addDocumentModalDescription(),
				component: 'addDocumentModal',
				response: (r: boolean) => {
					resolve(r);
				},
			};
			modalStore.trigger(modal);
		}).then((r: boolean) => {
			console.log('resolved response:', r);
		});
	};

	// Document Element Store
	const menuElementStore: Writable<DocumentElement[]> = localStorageStore('menuElements', []);

</script>

<nav class="p-4">
	<section id="documents" class="flex flex-row group">
			<span class="title">
				<iconify-icon icon="lucide:file-text"></iconify-icon>
				{m.documents()}
			</span>
		<span class="actions">
				<button type="button"
								class="btn-icon btn-icon-sm variant-filled-surface hidden group-hover:block hover:variant-filled"
								on:click={addDocument}>
					<iconify-icon icon="lucide:file-plus-2"></iconify-icon>
				</button>
			</span>
	</section>
	<ul>
		{#each $menuElementStore as document, index}
			<li class="flex flex-row">
				<span>
					<iconify-icon icon="lucide:{document.icon}"></iconify-icon>
				</span>
				<span>{document.name}</span>
			</li>
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
        margin-left: 02rem;

        span.title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-left: 0.2rem;
            margin-bottom: 2rem;
        }
    }
</style>