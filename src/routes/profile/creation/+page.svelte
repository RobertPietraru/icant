<script lang="ts">
	import ProfileTypeCard from './ProfileTypeCard.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
</script>

<main class="px-32 flex flex-row justify-center items-center">
	<div class="flex flex-col md:space-y-8 min-h-[90vh] justify-center md:items-center">
		<h1 class="text-5xl md:text-8xl font-bold md:text-center">Creează-ți profilul</h1>
		<p class="pt-5 pb-10 md:p-0 text-xl md:text-3xl md:text-center">
			Alege un tip de profil potrivit ție!
		</p>
		<div class="flex flex-wrap md:justify-around w-[85vw] gap-y-10">
			<ProfileTypeCard disabled={data.hasTeacherProfile} type={'teacher'} href={'creation/teacher'} />
			<ProfileTypeCard disabled={data.hasMentorProfile} type={'mentor'} href={'creation/mentor'} />
			<ProfileTypeCard disabled={false} type={'student'} href={'creation/student'} />
		</div>
	</div>
</main>
