<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	import * as m from '$paraglide/messages';

</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/documents" on:click={drawerClose}>{m.leftMenu.documents.title()}</a></li>
		<li><a href="/templates" on:click={drawerClose}>{m.templates()}</a></li>
	</ul>
</nav>