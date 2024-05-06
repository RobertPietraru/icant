<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/select';
	import type { PageData } from './$types.js';
	import ProfileForm from './profile-form.svelte';
	export let data: PageData;
	import studentImage from '$lib/assets/profile/student.svg';
</script>

<main class="flex flex-row min-h-[90vh] px-0 py-10 justify-evenly">
	<section class="flex flex-col items-center justify-between">
		<h1 class="text-5xl md:text-8xl font-bold">Detalii profil</h1>
		<div class="flex flex-col md:items-center gap-4 md:w-90">
			<img src={studentImage} alt="Profile type" />
			<h2 class="md:text-center font-bold text-3xl">APROAPE GATA</h2>
			<p class="md:text-center">Completează cu datele tale pentru a continua.</p>
		</div>
		<div></div>
	</section>

	<div class="flex flex-col justify-center w-1/3">
		<!-- <div>
			<h3 class="text-lg font-medium">Profile</h3>
			<p class="text-sm text-muted-foreground">
				Informatiile de aici sunt vizible pentru toti utilizatorii
			</p>
		</div> -->
		<ProfileForm data={data.form} />
	</div>
</main>