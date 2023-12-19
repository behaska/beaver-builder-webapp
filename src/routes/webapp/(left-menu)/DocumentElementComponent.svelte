<script lang="ts">
	import type { DocumentElement } from '$lib/models/DocumentElement';
	import AddDocumentButton from './AddDocumentButton.svelte';
	import RemoveDocumentButton from './RemoveDocumentButton.svelte';
	import UpdateDocumentButton from './UpdateDocumentButton.svelte';

	export let document: DocumentElement;
	export let parent: DocumentElement;

	let children: DocumentElement[];
	$: children = document.documents;

	let hasChildren: boolean;
	$: hasChildren = children.length > 0;

</script>

<!-- Component HTML -->
<li class="flex flex-row group">
	<span>
		<iconify-icon icon="lucide:{document.icon}"></iconify-icon>
	</span>
	<span>{document.name}</span>
	<AddDocumentButton bind:document={document} />
	<UpdateDocumentButton bind:parent={parent} bind:document={document} />
	<RemoveDocumentButton bind:parent={parent} bind:document={document} />
</li>
{#if hasChildren}
	<ul class="flex flex-col">
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