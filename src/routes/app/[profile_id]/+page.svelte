<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	import type { PageData } from './$types';

	export let data;
	var typeText : string;
	switch (data.profile.type) {
		case 'student':
			typeText = 'Elev';
		case 'mentor':
			typeText = 'Mentor';
		case 'teacher':
			typeText = 'Profesor';
	}
</script>

<div class="flex flex-wrap px-10 gap-10">
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
		<p>{data.profile.bio}</p>
	</div>
</div>
