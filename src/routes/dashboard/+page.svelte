<script lang="ts">
	import type { PageData } from './$types';
	import ProfileCard from './ProfileCard.svelte';

	export let data: PageData;
</script>

<form action="?/logout" method="post">
	<button class="btn variant-filled w-full mt-4 mb-2" formaction="?/logout">Logut</button>
</form>

<div class="flex flex-wrap">
	{#each data.profiles as profile}
		<ProfileCard {profile} />
	{/each}
</div>
