<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageData } from './$types';
	import { Description } from 'formsnap';
	export let data: PageData;


	function cancelSession(id: string | undefined): void {
		if (!id) {
			return;
		}
		fetch(`/api/session/${id}`, {
			method: 'DELETE',
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
								<Table.Cell
									class="outline-dotted outline-1 outline-gray-300 text-center"
									colspan={block.cells}
								>
									<Dialog.Root>
										<Dialog.Trigger>{block.session?.subject}</Dialog.Trigger>
										<Dialog.Content class="sm:max-w-[425px]">
											<Dialog.Header>
												<Dialog.Title>Pregatire</Dialog.Title>

												<Dialog.Description
													>Profesor - {block.session.teacher_name}</Dialog.Description
												>
												<Dialog.Description>Materie - {block.session.subject}</Dialog.Description>
												<Dialog.Description class="font-bold {!block.session.teacher_confirmed ? 'text-red-500' : ''}">Confirmata de profesor - {block.session.teacher_confirmed ? 'DA' : 'NU'}</Dialog.Description>
											</Dialog.Header>

											<Dialog.Header>
												<Dialog.Title>Conectare</Dialog.Title>
												{#if block.session.google_meet_link}
													<Dialog.Description
														>Google Meet - {block.session.google_meet_link}</Dialog.Description
													>
												{:else}
													<Dialog.Description>Nu s-au oferit date de conectare</Dialog.Description>
												{/if}
											</Dialog.Header>

											<Dialog.Footer>
												<Button  on:click={
													() => cancelSession(block.session?.id)
												}  variant="destructive">Anuleaza Pregatirea</Button>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Root>
								</Table.Cell>
							{:else}
								<Table.Cell
									class="outline-dotted outline-1 outline-gray-300 text-transparent"
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
