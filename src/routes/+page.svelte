<script>
	import image from '$lib/assets/landing/landing_1.png';
</script>

<header class="p-5">
	<div class="flex flex-row justify-between items-center">
		<h1 class="font-bold text-4xl">iCanT</h1>
		<div class="flex flex-row items-center space-x-10">
			<a href="/about">Despre</a>
			<button
				on:click={() => {
					alert('asf');
				}}
				class="bg-blue-400 rounded-lg px-5 py-1.5 text-lg font-bold text-white">INCEPE</button
			>
		</div>
	</div>
</header>

<main class="px-32 flex flex-row justify-between">
		<div class="flex flex-col space-y-3 items-start h-[90vh] justify-center">
			<h1 class="text-9xl font-bold">Invata. Predeaza.</h1>
			<p class="text-3xl font-semibold">Omul cat traieste <span class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold">invata</span>, iar tu semeni cu ratza.<br> Milsu? Cam asta e layout-ul</p>
			<div class="h-10"></div>
			
				<a class="bg-blue-300 px-32 py-5 rounded-full font-bold text-2xl" href=""> iCanT </a>
		</div>

		<img src={image} alt="Ilustratie foarte frumoasa" class="md:block hidden w-[40vw]" />
</main>
