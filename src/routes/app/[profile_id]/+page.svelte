<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	import type { PageData } from './$types';

	export let data;
	var typeText: string;
	console.log(data.profile.type);
	switch (data.profile.type) {
		case 'student':
			typeText = 'Elev';
			break;
		case 'mentor':
			typeText = 'Mentor';
			break;
		case 'teacher':
			typeText = 'Profesor';
			break;
	}
</script>

<main class="p-8">
	<div class="flex flex-col gap-2">
		<div class="flex flex-row gap-5">
			{#if data.profile.photo}
				<img src={data.profile.photo} alt="profile" class="rounded-full w-20 h-20 mx-auto mb-4" />
			{:else}
				<div class="rounded-full w-20 h-20 bg-gray-200" />
			{/if}
			<div>
				<h1>{data.profile.last_name} {data.profile.first_name}</h1>
				<h2>{typeText}</h2>
			</div>
		</div>
		<p class="text-gray-500">{data.profile.bio}</p>
	</div>
</main>
