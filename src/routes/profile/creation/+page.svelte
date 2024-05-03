<script lang="ts">
	import image from '$lib/assets/landing/landing_1.png';
	import {ProfileType} from '$lib/enums';
	import ProfileTypeCard from '../../../components/profile/ProfileTypeCard.svelte';
</script>

<main class="px-32 flex flex-row justify-center items-center">
	<div class="flex flex-col md:space-y-8 min-h-[90vh] justify-center md:items-center">
		<h1 class="text-5xl md:text-8xl font-bold md:text-center">Creează-ți profilul</h1>
		<p class="pt-5 pb-10 md:p-0 text-xl md:text-3xl md:text-center">Alege un tip de profil potrivit ție!</p>
		<div class="flex flex-wrap md:justify-around w-[85vw] gap-y-10">
			 <ProfileTypeCard type={ProfileType.TEACHER} href={"creation/teacher"}/>
			 <ProfileTypeCard type={ProfileType.MENTOR} href={"creation/mentor"}/>
			 <ProfileTypeCard type={ProfileType.STUDENT} href={"creation/student"}/>

		</div>
	</div>
</main>
