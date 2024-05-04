<script lang="ts">
	import teacherImage from '$lib/assets/profile/teacher.svg';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<main class="flex flex-row min-h-[90vh] px-0 py-10 justify-evenly">
	<section class="flex flex-col items-center justify-between">
		<h1 class="text-5xl md:text-8xl font-bold">Detalii profil</h1>
		<div class="flex flex-col md:items-center gap-4 md:w-90">
			<img src={teacherImage} alt="Profile type" />
			<h2 class="md:text-center font-bold text-3xl">APROAPE GATA</h2>
			<p class="md:text-center">Completează cu datele tale pentru a continua.</p>
		</div>
		<div></div>
	</section>

	<form action="?/create" method="POST" class="w-1/3 flex flex-col items-stretch gap-4 justify-center">

		<div class="grid gap-4 md:grid-cols-2">
			<div>
				<label for="last_name" class="text-sm font-medium text-gray-900 dark:text-white">Nume</label
				>
				<input
					type="text"
					id="last_name"
					name="last_name"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Nume"
					required
				/>
			</div>
			<div>
				<label for="first_name"  class="text-sm font-medium text-gray-900 dark:text-white"
					>Prenume</label
				>
				<input
					type="text"
					name="first_name"
					id="first_name"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Prenume"
					required
				/>
			</div>
			<div>
				<label for="date_of_birth" class="block text-sm font-medium text-gray-900 dark:text-white"
					>Data nasterii</label
				>
				<input
					type="date"
					name="date_of_birth"
					id="date_of_birth"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-xl"
					placeholder="12/12/2000"
					required
				/>
			</div>

			<div>
				<label for="gender" class="block text-sm font-medium text-gray-900 dark:text-white"
					>Gen</label
				>
				<select
					id="gender"
					name="gender"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
				>
					<option value="male">Barbat</option>
					<option value="female">Femeie</option>
				</select>
			</div>
		</div>
		<div>
			<label for="phone" class="block text-sm font-medium text-gray-900 dark:text-white"
				>Numar de telefon</label
			>
			<input
				type="tel"
				id="phone"
				name="phone"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="0723456789"
				required
			/>
		</div>

		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-24 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button
		>

		{#if form?.fail}
			<div class="text-red-400 font-bold text-center">
				{form.message}
			</div>
		{/if}
	</form>
</main>
