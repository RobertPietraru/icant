<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="text-5xl font-bold text-gray-700">Calendar</h1>
<h2 class="text-3xl font-bold text-gray-400">Aici poti vedea toate sedintele planificate</h2>

<Card.Root class="mt-5">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>08:00</p>
						-
						<p>09:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>09:00</p>
						-
						<p>10:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>10:00</p>
						-
						<p>11:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>11:00</p>
						-
						<p>12:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>12:00</p>
						-
						<p>13:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>13:00</p>
						-
						<p>14:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>14:00</p>
						-
						<p>15:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>15:00</p>
						-
						<p>16:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>16:00</p>
						-
						<p>17:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>17:00</p>
						-
						<p>18:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>18:00</p>
						-
						<p>19:00</p>
					</div></Table.Head
				>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/12 "
					><div class="flex flex-row justify-between">
						<p>19:00</p>
						-
						<p>20:00</p>
					</div></Table.Head
				>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.calendar as calendarDay}
				<Table.Row>
					{#if calendarDay.blocks}
						{#each calendarDay.blocks as block}
							{#if block.session}
								<Table.Cell class="outline-dotted outline-1 outline-gray-300 text-center" colspan={block.cells}
									>{block.session?.id}</Table.Cell >
							{:else}
								<Table.Cell class="outline-dotted outline-1 outline-gray-300 text-transparent" colspan={block.cells}>a</Table.Cell>
							{/if}
						{/each}
					{/if}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Card.Root>
