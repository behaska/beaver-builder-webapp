<script lang="ts">
	import type { DocumentElement } from '$lib/models/DocumentElement';
	import AddDocumentButton from './AddDocumentButton.svelte';
	import RemoveDocumentButton from './RemoveDocumentButton.svelte';
	import UpdateDocumentButton from './UpdateDocumentButton.svelte';
	import * as m from '$paraglide/messages';

	export let document: DocumentElement;
	export let parent: DocumentElement;

	let children: DocumentElement[];
	$: children = document.documents;

	let hasChildren: boolean;
	$: hasChildren = children.length > 0;

	// Popup
	import { popup } from '@skeletonlabs/skeleton';

</script>

<!-- Component HTML -->
<li class="flex flex-row group">
	<a href="/webapp/documents/{document.id}" class='text-link flex flex-row'>
		<span class="badge bg-surface-500">
			<iconify-icon icon="lucide:{document.icon}"></iconify-icon>
		</span>
		<span class="flex-auto">{document.name}</span>
	</a>
	<span>
			<button class="btn variant-filled-surface"
							use:popup={{ event: 'click', target: 'popupFeatured-' + document.id, placement: 'bottom' }}>
			<span class="iconify" data-icon="lucide:menu"></span></button>
		</span>
	<span class="iconify" data-icon="lucide:more-vertical"></span>
	<div class="card p-4 w-72 h-40 shadow-xl" data-popup="popupFeatured-{document.id}">
		<div><p>Actions {document.id}</p></div>
		<div class="arrow bg-surface-100-800-token" />
		<AddDocumentButton bind:document={document} />
		<UpdateDocumentButton bind:parent={parent} bind:document={document} />
		<RemoveDocumentButton bind:parent={parent} bind:document={document} />
	</div>
</li>
{#if hasChildren}
	<ul class="list-nav flex flex-col">
		{#each children as node}
			<svelte:self bind:parent={document} bind:document={node} />
		{/each}
	</ul>
{/if}

<style lang="postcss">
    ul {
        margin-left: 0.5rem
    }
</style>