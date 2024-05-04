<script lang="ts">
	import type { Profile } from '$lib/models/profile';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	export let profile: Profile;
	var typeText: string;
	switch (profile.type) {
		case 'student':
			typeText = 'Elev';
		case 'mentor':
			typeText = 'Mentor';
		case 'teacher':
			typeText = 'Profesor';
	}
</script>

<div class="flex flex-col shadow-xl px-10 w-96 py-10 gap-10">
	<div class="flex flex-row gap-5">
		{#if profile.photo}
			<img src={profile.photo} alt="profile" class="rounded-full w-20 h-20 mx-auto mb-4" />
		{:else}
			<div class="rounded-full w-20 h-20 bg-gray-200" />
		{/if}
		<div>
			<h1>{profile.last_name} {profile.first_name}</h1>
			<h2>{typeText}</h2>
		</div>
		<p>{profile.bio}</p>
	</div>

	<Button on:click={() => goto(`/dashboard/${profile.id}`)}>Selecteaza</Button>
</div>
