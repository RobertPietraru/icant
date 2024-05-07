<script lang="ts">
	import mentorImage from '$lib/assets/profile/mentor.svg';
	import studentImage from '$lib/assets/profile/student.svg';
	import teacherImage from '$lib/assets/profile/teacher.svg';
	import teacherMaleImage from '$lib/assets/profile/teacher_male.svg';
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
	var typeText: string = 'necunoscut';
	var image: string;

	if (data.profile) {
		switch (data.profile.type) {
			case 'student':
				typeText = 'Elev';
				image = studentImage;
				break;
			case 'mentor':
				typeText = 'Mentor';
				image = mentorImage;
				break;
			case 'teacher':
				if (data.profile.gender == 'female'){
					image = teacherImage;
				} else {
					image = teacherMaleImage;
				}
				typeText = 'Profesor';
				break;
			default:
				image = studentImage;
				break;
		}
	}

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
						<DropdownMenuItem
							on:click={() => goto(`/app/${$page.params.profile_id}/edit_profile`)}
							class="flex flex-col"
						>
							<div class="flex flex-col gap-2 px-10">
								<div class="flex flex-row gap-2 justify-between">
									{#if data.profile != undefined && data.profile.photo}
										<img src={data.profile.photo} alt="profile" class="rounded-full w-20 h-20" />
									{:else}
										<img src={image} alt="profile" class="rounded-full w-20 h-20" />
									{/if}

									{#if data.profile != undefined}
										<div>
											<h1>{data.profile.last_name} {data.profile.first_name}</h1>
											<h2>{typeText}</h2>
										</div>
									{/if}
								</div>
							</div>
						</DropdownMenuItem>
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
