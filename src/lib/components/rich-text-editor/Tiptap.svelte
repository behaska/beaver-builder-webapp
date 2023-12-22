<script lang="ts">
	import { onMount, onDestroy, afterUpdate, beforeUpdate } from 'svelte';
	import { Editor, type JSONContent } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import type { TipTapDocumentElement } from '$lib/models/TipTapDocumentElement';
	import { page } from '$app/stores';

	export let document: TipTapDocumentElement;

	let element;
	let editor;
	let currentContent: JSONContent;

	$ : currentContent = document.content;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					paragraph: {
						HTMLAttributes: {
							class: 'beaver-builder',
						},
					},
					// Disable an included extension
					history: false,
					// Configure an included extension
					heading: {
						levels: [1, 2],
					},
				}),

			],
			type: 'doc',
			content: currentContent,
			autofocus: true,
			editable: true,
			injectCSS: false,
			editorProps: {
				attributes: {
					class: 'h-full w-full prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
				},
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				const json: JSONContent = editor.getJSON();
				document.content = json;
				// send the content to an API here
			},
		});
	})
	;

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	;

</script>

{#if editor}
	<div class="menu">
		<button class="btn-icon btn-icon-sm variant-ghost" type="button"
						on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
						class:active={editor.isActive('heading', { level: 1 })}
		>
			<iconify-icon icon="lucide:heading-1" />
		</button>
		<button class="btn-icon btn-icon-sm variant-ghost" type="button"
						on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						class:active={editor.isActive('heading', { level: 2 })}
		>
			<iconify-icon icon="lucide:heading-2" />
		</button>
		<button class="btn-icon btn-icon-sm variant-ghost"
						on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
			<iconify-icon icon="lucide:text" />
		</button>
		<button class="btn-icon btn-icon-sm variant-ghost"
						on:click={() => editor.chain().focus().toggleBlockquote().run()}
						class:active={editor.isActive('blockquote')}>
			<iconify-icon icon="lucide:text-quote" />
		</button>
	</div>
{/if}

<div class="h-full w-full" bind:this={element} />

<style lang="postcss">

    button.active {
        background: gray;
        color: white;
    }

</style>