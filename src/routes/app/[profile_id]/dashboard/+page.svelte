<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	import type { PageData } from './$types';

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
</script>

<main class="grid flex-1 items-start gap-4 md:gap-8">
	<div>
		<h1 class="text-5xl font-bold text-gray-700">Panou de control</h1>
		<h2 class="text-3xl font-bold text-gray-300">{typeText}</h2>
	</div>
	<Tabs.Root value="all">
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="all">All</Tabs.Trigger>
				<Tabs.Trigger value="active">Active</Tabs.Trigger>
				<Tabs.Trigger value="archived" class="hidden sm:flex">Archived</Tabs.Trigger>
			</Tabs.List>
			<div class="ml-auto flex items-center gap-2">
				<Button
					size="sm"
					class="h-8 gap-1"
					on:click={() => goto(`${data.profileId}/listings/create`)}
				>
					<CirclePlus class="h-3.5 w-3.5" />
					<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Creeaza Curs</span>
				</Button>
			</div>
		</div>
		<Tabs.Content value="all">
			<Card.Root>
				<Card.Header>
					<Card.Title>Products</Card.Title>
					<Card.Description>
						Manage your products and view their sales performance.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Name</Table.Head>
								<Table.Head>Status</Table.Head>
								<Table.Head class="hidden md:table-cell">Price</Table.Head>
								<Table.Head class="hidden md:table-cell">Total Sales</Table.Head>
								<Table.Head class="hidden md:table-cell">Created at</Table.Head>
								<Table.Head>
									<span class="sr-only">Actions</span>
								</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell class="font-medium">Luminous VR Headset</Table.Cell>
								<Table.Cell>
									<Badge variant="outline">Active</Badge>
								</Table.Cell>
								<Table.Cell class="hidden md:table-cell">$199.99</Table.Cell>
								<Table.Cell class="hidden md:table-cell">30</Table.Cell>
								<Table.Cell class="hidden md:table-cell">2024-02-14 02:14 PM</Table.Cell>
								<Table.Cell>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild let:builder>
											<Button builders={[builder]} aria-haspopup="true" size="icon" variant="ghost">
												<Ellipsis class="h-4 w-4" />
												<span class="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content align="end">
											<DropdownMenu.Label>Actions</DropdownMenu.Label>
											<DropdownMenu.Item>Edit</DropdownMenu.Item>
											<DropdownMenu.Item>Delete</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Card.Content>
				<Card.Footer>
					<div class="text-xs text-muted-foreground">
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</main>
