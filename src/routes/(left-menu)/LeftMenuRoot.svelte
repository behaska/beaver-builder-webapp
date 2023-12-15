<script lang="ts">
	import { getDrawerStore, type ModalSettings } from '@skeletonlabs/skeleton';

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
				}
			};
			modalStore.trigger(modal);
		}).then((r: any) => {
			console.log('resolved response:', r);
		});
	};
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