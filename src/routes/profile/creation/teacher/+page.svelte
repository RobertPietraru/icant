<script>
	import teacherImage from '$lib/assets/profile/teacher.svg';
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

	<section class="w-1/3">
		<form action="">
			<form>
				<div class="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label for="last_name" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Nume</label>
						<input
							type="text"
							id="last_name"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Nume"
							required
						/>
					</div>
					<div>
						<label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenume</label>
						<input
							type="tel"
							id="first_name"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="0723456789"
							pattern="[0-9]{10}"
							required
						/>
					</div>
				</div>
				<div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numar de telefon</label>
					<input
						type="tel"
						id="phone"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="0723456789"
						pattern="[0-9]{10}"
						required
					/>
				</div>
				<div class="mb-6">
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Email address</label
					>
					<input
						type="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-xl"
						placeholder="john.doe@company.com"
						required
					/>
				</div>
				<div class="mb-6">
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Password</label
					>
					<input
						type="password"
						id="password"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="•••••••••"
						required
					/>
				</div>

				<button
					type="submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Submit</button
				>
			</form>
		</form>
	</section>
</main>
