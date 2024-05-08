<script>
	import Search from 'lucide-svelte/icons/search';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import ListingCard from './(components)/ListingCard.svelte';
	export let data;
</script>

<main class="flex flex-col tap-4 md:gap-8">
	<div>
		<h1 class="text-5xl font-bold text-gray-700">Anunturi</h1>
		<h2 class="text-3xl font-bold text-gray-300">
			Aici vei gasi profesori pentru orice vrei sa inveti
		</h2>
	</div>
	<h2 class="text-3xl font-bold text-gray-700">Recomandate</h2>
	<div class="flex flex-wrap gap-10">
		{#if data.listings}
			{#each data.listings as pair}
				<ListingCard listing={pair.listing} profile={pair.profile} />
			{/each}
		{/if}
	</div>

	<h2 class="text-3xl font-bold text-gray-700">Noi aparute</h2>
	<div class="flex flex-wrap gap-10">
		{#if data.new_listings}
			{#each data.new_listings as pair}
				<ListingCard listing={pair.listing} profile={pair.profile} />
			{/each}
		{/if}
	</div>
</main>
