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
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

</script>

{#if editor}
	<div class="menu">

		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
			P
		</button>
		<button on:click={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive('bold')}>
			B
		</button>
	</div>
{/if}

<div bind:this={element} />

<style lang="postcss">
    button.active {
        background: black;
        color: white;
    }

    /* Scoped to the editor */
    .tiptap {
        h1 {
            margin: 1.25rem 0;
            font-size: 25px;
        }

        h2 {
            margin: 1.25rem 0;
            font-size: 18px;
        }

        p {
            margin: 1rem 0;
            font-size: 12px;
        }

        b {
            font-weight: 700;
        }
    }
</style>