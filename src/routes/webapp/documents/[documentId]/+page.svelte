<script lang='ts'>
	import { page } from '$app/stores';
	// Inspired by https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=4.2.7
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Tiptap from '$lib/components/rich-text-editor/Tiptap.svelte';

	let documentId: string;
	$ : documentId = $page.params.documentId;

	// Document Element Store
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	import { TipTapDocumentElement } from '$lib/models/TipTapDocumentElement';
	import { onDestroy, onMount } from 'svelte';

	const documentElementStore: Writable<TipTapDocumentElement[]> = localStorageStore('documentElements', []);

	let document: TipTapDocumentElement;

	let documentIndex: number;

	function getOrCreateDocument(documentId: string) {
		const documentFound = $documentElementStore.find(tipTapDocument => tipTapDocument.id === documentId);
		if (documentFound === undefined) {
			document = new TipTapDocumentElement(documentId, '');
			$documentElementStore.push(document);
			$documentElementStore = $documentElementStore;
		} else {
			document = documentFound;
		}
		documentIndex = $documentElementStore.findIndex(tipTapDocument => tipTapDocument.id === documentId);
	}

	$ : getOrCreateDocument(documentId);

	const flipDurationMs: number = 100;

	interface ListItem {
		id: number;
		title: string;
		description: string;
		tags: string[];
	}

	let items: ListItem[] = [
		{
			id: 1,
			title: 'Blog Post 1',
			description: 'Blog Post 1 Description',
			tags: ['development'],
		},
		{
			id: 2,
			title: 'Blog Post 2',
			description: 'Blog Post 2 Description ',
			tags: ['architecture'],
		},
		{
			id: 3,
			title: 'Blog Post 3',
			description: 'Blog Post 3 Description ',
			tags: ['game', 'rpg'],
		},
	];

	const handleConsider = (evt: CustomEvent<DndEvent<ListItem>>) => {
		items = evt.detail.items;
	};

	const handleFinalize = (evt: CustomEvent<DndEvent<ListItem>>) => {
		items = evt.detail.items;
	};

</script>

<svelte:head>
	<title>Document {documentId}</title>
	<meta name='description' content='A simple document.' />
</svelte:head>

<section>
	<h1>Welcome home to {documentId}!</h1>

	<h2>A rich WYSIWYG</h2>
	<div class="flex flex-col container h-screen w-screen mx-auto flex justify-center items-center">
		{#key documentId}
			<Tiptap bind:document={$documentElementStore[documentIndex]} />
		{/key}
	</div>

	<hr>

	<div class='container h-full mx-auto flex justify-center items-center'>
		<h3>Nombre d'items {items.length}</h3>
		<section use:dndzone='{{ items: items, flipDurationMs: flipDurationMs, dropTargetStyle:{}}}'
						 on:consider='{handleConsider}'
						 on:finalize='{handleFinalize}'
		>
			{#each items as item (item.id)}
				<div class='card card-hover w-96 my-4' animate:flip='{{duration: flipDurationMs}}'>
					<header class='card-header'>
						<h4>{item.title}</h4>
					</header>
					<section class='p-4'>
						{item.description}
					</section>
					<footer class='card-footer inline-block'>
						{#each item.tags as tag}
							<span class='chip variant-filled-secondary'>
								{tag}
							</span>
						{/each}
					</footer>
				</div>
			{/each}
		</section>

	</div>

</section>

<style lang='postcss'>
    section {
        display: flex;
        flex-direction: column;
    }
</style>