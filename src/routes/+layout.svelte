<script>
	import '../app.css';
	import image from '$lib/assets/landing/landing_1.png';
</script>

<header class="p-5">
	<div class="flex flex-row justify-between items-center">
		<h1 class="font-bold text-4xl text-blue-400">iCanT</h1>
		<div class="flex flex-row items-center space-x-10">
			<a href="/about">Despre</a>
			<button
				on:click={() => {
					alert('asf');
				}}
				class="bg-blue-400 rounded-lg px-5 py-1.5 text-lg font-bold text-white">Invata</button
			>
		</div>
	</div>
</header>

<slot />
