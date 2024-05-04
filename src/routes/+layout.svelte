<script lang="ts">
	import '../app.css';
	import image from '$lib/assets/landing/landing_1.png';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';

	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	async function logout() {
		const res = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		/// reload page
		if (res.ok) {
			location.reload();
		} else {
			console.error('Failed to logout');
		}
	}
</script>

<header class="p-5">
	<div class="flex flex-row justify-between items-center">
		<a class="font-bold text-4xl text-blue-400" href="/">iCanT</a>
		<div class="flex flex-row items-center space-x-10">
			<a href="/about">Despre</a>
			{#if data.user}
				<DropdownMenu>
					<DropdownMenuTrigger class="font-bold">Contul meu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Setari cont</DropdownMenuItem>
						<DropdownMenuSeparator />
						{#if data.profiles && data.profiles.length > 0}
							<DropdownMenuLabel>Profilele</DropdownMenuLabel>
							{#each data.profiles as profile}
								<DropdownMenuItem>{profile.first_name} {profile.last_name}</DropdownMenuItem>
							{/each}
						{/if}
						<DropdownMenuSeparator />
						<DropdownMenuItem on:click={logout}>Delogheaza-te</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				{:else} 
				<Button  variant="ghost" on:click={() => goto(`/auth/login`)}>Login</Button>
			{/if}
		</div>
	</div>
</header>
<slot />
