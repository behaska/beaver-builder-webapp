<script lang="ts">
	import { page } from '$app/stores';

	import '../app.postcss';
	import { AppShell, AppBar, Avatar, Modal, type ModalComponent } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Drawer for Hamburger Button in sm mode
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import LeftMenuRoot from './webapp/(left-menu)/LeftMenuRoot.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	$: classesSidebar = $page.url.pathname.includes('webapp') ? 'w-0 lg:w-64' : 'w-0';

	import * as m from '$paraglide/messages';

</script>

<Drawer>
	<h2 class="p-4">{m.navigation()}</h2>
	<hr />
	<LeftMenuRoot />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/10 {classesSidebar}">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
            <span>
                <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                    <rect width="100" height="20" />
                    <rect y="30" width="100" height="20" />
                    <rect y="60" width="100" height="20" />
                </svg>
            </span>
					</button>
				</div>
			</svelte:fragment>
			<strong class="text-xl uppercase">Beaver Builder</strong>
			<svelte:fragment slot="trail">
				<nav>
					<ul class="flex">
						<li class="mx-2"><a href="/">{m.homepage()}</a></li>
						<li class="mx-2"><a href="/webapp">{m.webapp()}</a></li>
						<li class="mx-2"><a href="/about">{m.about()}</a></li>
						<li class="mx-2"><a href="/blog">{m.blog()}</a></li>
						<li class="mx-2"><a href="/contact">{m.contact()}</a></li>
					</ul>
				</nav>
				<Avatar src="invalid-image.jpg" initials="AB" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Hidden below Tailwind's large breakpoint -->
		<LeftMenuRoot />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">

		<a
			class="btn btn-sm variant-ghost-surface"
			href="https://discord.gg/EXqV7W8MtY"
			target="_blank"
			rel="noreferrer"
		>
			Discord
		</a>
		<a
			class="btn btn-sm variant-ghost-surface"
			href="https://twitter.com/SkeletonUI"
			target="_blank"
			rel="noreferrer"
		>
			Twitter
		</a>
		<a
			class="btn btn-sm variant-ghost-surface"
			href="https://github.com/skeletonlabs/skeleton"
			target="_blank"
			rel="noreferrer"
		>
			GitHub
		</a>

	</svelte:fragment>

</AppShell>
