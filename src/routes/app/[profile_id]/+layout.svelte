<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';

	import { goto } from '$app/navigation';
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';

	export let data;

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
	function setPosition(value: string | undefined): void {
		if (!value) return;
		const old = $page.params.profile_id;
		const newUrl = $page.url.pathname.replace(old, value);
		goto(newUrl);
	}
</script>

<header class="p-5">
	<div class="flex flex-row justify-between items-center">
		<a class="font-bold text-4xl text-blue-400" href="/">iCanT</a>
		<div class="flex flex-row items-center space-x-10">
			<a href="/about">Despre</a>
			{#if data.user}
				<DropdownMenu>
					<DropdownMenuTrigger class="font-bold"
						><Button variant="ghost">Contul meu</Button></DropdownMenuTrigger
					>
					<DropdownMenuContent>
						<DropdownMenuItem>Setari cont</DropdownMenuItem>
						<DropdownMenuItem on:click={() => goto(`/app/${$page.params.profile_id}/edit_profile`)}
							>Editare Profil</DropdownMenuItem
						>
						<DropdownMenuSeparator />
						{#if data.profiles && data.profiles.length > 0}
							<DropdownMenuLabel>Profile</DropdownMenuLabel>
							<DropdownMenuRadioGroup value={data.profileId} onValueChange={setPosition}>
								{#each data.profiles as profile}
									<DropdownMenuRadioItem value={profile.id}
										>{profile.first_name} {profile.last_name}</DropdownMenuRadioItem
									>
								{/each}
							</DropdownMenuRadioGroup>
							<DropdownMenuItem on:click={() => goto('/profile/creation')}>Adauga</DropdownMenuItem>
							<DropdownMenuSeparator />
						{/if}

						<DropdownMenuItem on:click={logout}>Delogheaza-te</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			{:else}
				<Button variant="ghost" on:click={() => goto(`/auth/login`)}>Login</Button>
			{/if}
		</div>
	</div>
</header>
<slot />
