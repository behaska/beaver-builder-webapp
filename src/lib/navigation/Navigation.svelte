<script lang="ts">
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	import * as m from '$paraglide/messages';

</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>{m.homepage()}</a></li>
		<li><a href="/webapp" on:click={drawerClose}>{m.webapp()}</a></li>
		<li><a href="/about" on:click={drawerClose}>{m.about()}</a></li>
		<li><a href="/blog" on:click={drawerClose}>{m.blog()}</a></li>
		<li><a href="/contact" on:click={drawerClose}>{m.contact()}</a></li>
	</ul>
</nav>