<script lang="ts">
	import mentorImage from '$lib/assets/profile/mentor.svg';
	import studentImage from '$lib/assets/profile/student.svg';
	import teacherImage from '$lib/assets/profile/teacher.svg';
	import teacherMaleImage from '$lib/assets/profile/teacher_male.svg';
	import Button from '$lib/components/ui/button/button.svelte';
	import Home from 'lucide-svelte/icons/home';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';

	import { Input } from '$lib/components/ui/input/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

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
	import { page } from '$app/stores';
	import UserRound from 'lucide-svelte/icons/user-round';

	export let data;
	var typeText: string = 'necunoscut';
	var image: string;

	$: {
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
					if (data.profile.gender == 'female') {
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
	const selectedTabStyle =
		'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
	const unselectedTabStyle =
		'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
	function getTabStyle(tabName: string): string {
		const path = $page.url.pathname;
		console.log(path);
		return path === tabName ? selectedTabStyle : unselectedTabStyle;
	}
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href={`/app/${data.profileId}/`}
						class={$page.url.pathname.includes(`/app/${data.profileId}`)
							? selectedTabStyle
							: unselectedTabStyle}
						use:builder.action
						{...builder}
					>
						<Home class="h-5 w-5" />
						<span class="sr-only">Dashboard</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Dashboard</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href={`/app/${data.profileId}/edit_profile`}
						class={getTabStyle('edit_profile')}
						use:builder.action
						{...builder}
					>
						<UserRound class="h-5 w-5" />
						<span class="sr-only">Profile</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Customers</Tooltip.Content>
			</Tooltip.Root>
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="##"
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						use:builder.action
						{...builder}
					>
						<Settings class="h-5 w-5" />
						<span class="sr-only">Settings</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Settings</Tooltip.Content>
			</Tooltip.Root>
		</nav>
	</aside>
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="sticky top-0 z-30 flex h-14 items-start gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<a class="font-bold text-4xl text-blue-400" href="/">iCanT</a>

			<div class="relative ml-auto flex-1 md:grow-0">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
				/>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						size="icon"
						class="overflow-hidden rounded-full"
					>
						{#if data.profile != undefined && data.profile.photo}
							<img
								src={data.profile.photo}
								alt="profile"
								class="overflow-hidden rounded-full"
								width={36}
								height={36}
							/>
						{:else}
							<img
								src={image}
								alt="profile"
								class="overflow-hidden rounded-full"
								width={36}
								height={36}
							/>
						{/if}
					</Button>
				</DropdownMenuTrigger>

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
		</header>
		<div class="px-12">
			<slot class="px-12" />
		</div>
	</div>
</div>
