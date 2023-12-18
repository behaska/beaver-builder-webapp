<script lang="ts">
	import type { DocumentElement } from '$lib/models/DocumentElement';

	export let document: DocumentElement;

	let children: DocumentElement[] = document.documents;
	let hasChildren: boolean = children.length > 0;

</script>

<!-- Component HTML -->
<span>
	<iconify-icon icon="lucide:{document.icon}"></iconify-icon>
</span>
<span>{document.name}</span>
{#if hasChildren}
	{#each children as document, index}
		<li class="flex flex-row">
			<svelte:self document={document} />
		</li>
	{/each}
{/if}

<style lang="postcss">
    span {
        margin-left: 0.2rem
    }
</style>