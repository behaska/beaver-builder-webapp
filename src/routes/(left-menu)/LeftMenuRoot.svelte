<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	function addDocument(): void {
		console.log('Document added !');

	}

	// i18n
	import * as m from '$paraglide/messages';

	//iconify
	import 'iconify-icon';

</script>

<nav class="p-4">
	<ul>
		<li class="flex flex-row group">
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
		</li>
		<li>
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
    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        span.title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-left: 0.2rem;
            margin-bottom: 2rem;
        }
    }
</style>