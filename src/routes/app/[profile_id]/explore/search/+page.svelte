<script>
	import ListingCard from '../(components)/ListingCard.svelte';
	export let data;
</script>

<main class="flex flex-col tap-4 md:gap-8">
	<div>
		<h1 class="text-5xl font-bold text-gray-700">Rezultate</h1>
		<h2 class="text-3xl font-bold text-gray-400">
            Acestea sunt rezultatele cautarii
		</h2>
	</div>
	<div class="flex flex-wrap gap-10">
		{#if data.listings}
			{#each data.listings as pair}
				<ListingCard listing={pair.listing} profile={pair.profile} />
			{/each}
		{/if}
	</div>
</main>
