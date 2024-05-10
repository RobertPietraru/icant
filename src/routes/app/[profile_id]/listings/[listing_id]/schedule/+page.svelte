<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Copy from 'lucide-svelte/icons/copy';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';
	import { Description } from 'formsnap';
	export let data: PageData;

	function copyText(text: string | undefined) {
		if (!text) {
			return;
		}

		navigator.clipboard.writeText(text);
	}

	function getDay(dayIndex: number): string {
		const today = new Date();
		return new Intl.DateTimeFormat('ro-RO', { weekday: 'narrow' }).format(
			new Date(today.setDate(today.getDate() + dayIndex))
		);
	}

	function createNewSession(dayIndex: number, hourIndex: number): void {
		const listing = data.listing;
		if (!listing) {
			return;
		}

		const duration = listing.session_duration;
		/// given dayIndex and hourIndex, create a new session if there is enough time
		for (let i = hourIndex; i < hourIndex + duration; i++) {
			const day = data.calendar[dayIndex];
			if (!day) {
				return;
			}

			const block = day.blocks[i];
			if (!block) {
				return;
			}

			if (block.session) {
				alert('Nu exista suficient timp pentru a crea o sedinta');
				return;
			}

			if (!data.listing) {
				return;
			}
			const my_day = new Date(new Date().getDate() + dayIndex * 24 * 60 * 60 * 1000);
			my_day.setHours(hourIndex, 0, 0, 0);

			const body = {
				student_id: data.profileId,
				teacher_id: data.listing.teacher_id,
				listing_id: data.listing.id,
				start_date: my_day,
				end_date: new Date(my_day.getDate() + duration * 60 * 60 * 1000)
			};

			fetch(`/api/session/`, {
				method: 'POST',
				body: JSON.stringify(body),
			})
				.then((res) => {
					if (res.ok) {
						alert('Sedinta a fost anulata cu succes');
						location.reload();
					} else {
						alert('A aparut o eroare la anularea sedintei');
					}
				})
				.catch((err) => {
					alert('A aparut o eroare la anularea sedintei');
				});
		}
	}
</script>

<h1 class="text-5xl font-bold text-gray-700">Calendar</h1>
<h2 class="text-3xl font-bold text-gray-400">Aici poti vedea toate sedintele planificate</h2>

<Card.Root class="mt-5">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="outline-dotted outline-1 outline-gray-300 w-1/13 "
					><div class="flex flex-row justify-between">
						<p>Zi</p>
					</div></Table.Head
				>
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
					<Table.Cell class="outline-dotted outline-1 outline-gray-300 text-center ">
						{getDay(calendarDay.dayIndex)}
					</Table.Cell>
					{#if calendarDay.blocks}
						{#each calendarDay.blocks as block}
							{#if block.session}
								<Table.Cell
									class="outline-dotted outline-1 outline-gray-300 text-center {block.session
										.teacher_confirmed
										? 'bg-green-100'
										: 'bg-red-100'}"
									colspan={block.cells}
								></Table.Cell>
							{:else}
								<Table.Cell
									class="outline-dotted outline-1 outline-gray-300 text-transparent"
									on:click={() => createNewSession(calendarDay.dayIndex, block.hourIndex)}
									colspan={block.cells}>a</Table.Cell
								>
							{/if}
						{/each}
					{/if}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Card.Root>
