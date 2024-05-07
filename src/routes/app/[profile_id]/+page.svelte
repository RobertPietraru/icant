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
</main>
