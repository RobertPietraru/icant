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
	<h1 class="text-5xl font-bold text-gray-700">Panou de control</h1>
	<h2 class="text-3xl font-bold text-gray-300">{typeText}</h2>

	<section class="my-10">
		<div class="flex flex-row items-center gap-10  justify-between md:justify-start">
			<div>
				<h1 class="text-4xl font-bold text-gray-700">Anunturi</h1>
				<h2 class="text-2xl font-bold text-gray-300">Aici sunt toate anunturile postate de tine</h2>
			</div>
			<Button  variant="default" on:click={
				() => goto(`${data.profileId}/listings/create`)
			}>Adauga</Button>
		</div>
	</section>
</main>
