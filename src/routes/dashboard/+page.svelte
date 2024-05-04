<script lang="ts">

	import type { PageData } from './$types';
	import ProfileCard from './ProfileCard.svelte';

	export let data: PageData;
</script>

<div class="flex flex-wrap px-10 gap-10">
	{#each data.profiles as profile}
		<ProfileCard {profile} />
	{/each}
</div>

