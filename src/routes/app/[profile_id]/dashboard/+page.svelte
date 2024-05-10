<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	export let data;
	var typeText: string;
	if (data.profile) {
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
	}

	async function deleteListing(id: string) {
		const res = await fetch(`/api/listings/${id}/delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			location.reload();
		} else {
			console.error('Failed to delete listing');
		}
	}
</script>

<main class="grid flex-1 items-start tap-4 md:gap-8">
	<div>
		<h1 class="text-5xl font-bold text-gray-700">Panou de control</h1>
		<h2 class="text-3xl font-bold text-gray-300">{typeText}</h2>
	</div>
	<Card.Root class="pr-10">
		<div class="flex flex-row items-center justify-between">
			<Card.Header>
				<Card.Title>Anunturi</Card.Title>
				<Card.Description>Acestea sunt anunturile publicate</Card.Description>
			</Card.Header>

			<Button
				size="sm"
				class="h-8 gap-1"
				on:click={() => goto(`/app/${data.profileId}/listings/create`)}
			>
				<CirclePlus class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Creeaza Curs</span>
			</Button>
		</div>
		<Card.Content>

			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Titlu</Table.Head>
						<Table.Head class="hidden md:table-cell">Pret/Sedinta</Table.Head>
						<Table.Head class="hidden md:table-cell">Durata Sedinta</Table.Head>
						<Table.Head class="hidden md:table-cell">Creat la data de</Table.Head>
						<Table.Head class="hidden md:table-cell">Modificat la data de</Table.Head>
						<Table.Head>
							<span class="sr-only">Actiuni</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.listings as listing}
						<Table.Row>
							<Table.Cell class="font-medium">{listing.title}</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{listing.price} RON</Table.Cell>
							<Table.Cell class="hidden md:table-cell">{listing.session_duration} minute</Table.Cell
							>
							<Table.Cell class="hidden md:table-cell"
								>{listing.created_at.toLocaleDateString()}</Table.Cell
							>
							<Table.Cell class="hidden md:table-cell"
								>{listing.modified_at.toLocaleDateString()}</Table.Cell
							>
							<Table.Cell>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger asChild let:builder>
										<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
											<Ellipsis class="h-4 w-4" />
											<span class="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Item
											on:click={() => goto(`/app/${data.profileId}/listings/${listing.id}/update`)}
											>Modifica</DropdownMenu.Item
										>
										<DropdownMenu.Item
											class="text-red-500 font-semibold"
											on:click={async () => await deleteListing(listing.id)}
											>Sterge</DropdownMenu.Item
										>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
		<Card.Footer>
			{#if data.total_items > data.batch_size}
				<div class="text-xs text-muted-foreground">
					<strong
						>{(data.page - 1) * data.batch_size + 1}-{(data.page - 1) * data.batch_size +
							data.batch_size}</strong
					>
					din <strong>{data.total_items}</strong> anunturi
				</div>
			{:else}
				<div class="text-xs text-muted-foreground">
					<strong>{data.total_items}</strong>
					{data.total_items === 1 ? 'anunt' : 'anunturi'}
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
</main>
