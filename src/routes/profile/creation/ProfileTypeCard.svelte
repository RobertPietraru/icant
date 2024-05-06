<script lang="ts">
	import mentorImage from '$lib/assets/profile/mentor.svg';
	import studentImage from '$lib/assets/profile/student.svg';
	import teacherImage from '$lib/assets/profile/teacher.svg';
	import type { ProfileType, Profile } from '$lib/models/profile';

	export let type: ProfileType;
	export let href: string;
	export let disabled: boolean;
	let image: string, title: string, description: string;
	switch (type) {
		case 'mentor':
			image = mentorImage;
			title = 'MENTOR';
			description =
				'Un fel de profesor, dar necalificat. Deobicei un elev care se pricepe la ceva, dar nu neaparat la predat.';
			break;
		case 'student':
			image = studentImage;
			title = 'ELEV';
			description =
				'Un elev care învață. De obicei nu se pricepe la nimic, dar încearcă să se priceapă la ceva.';
			break;
		case 'teacher':
			image = teacherImage;
			title = 'PROFESOR';
			description = 'Un profesor in toata regula. De obicei se pricepe la ceva si stie sa predea.';
			break;
	}
	const h2Style = 'md:text-center font-bold text-3xl' + (disabled ? ' text-gray-400' : '');
	const pStyle = 'md:text-center' + (disabled ? ' text-gray-400' : '');
</script>

{#if disabled}
	<div class="flex flex-col md:items-center gap-4 md:w-80">
		<img src={image} alt="Profile type" />
		<h2 class={h2Style}>{title}</h2>
		<p class={pStyle}>{description}</p>
		<slot />
	</div>
{:else}
	<a class="flex flex-col md:items-center gap-4 md:w-80" {href}>
		<img src={image} alt="Profile type" />
		<h2 class={h2Style}>{title}</h2>
		<p class={pStyle}>{description}</p>
		<slot />
	</a>
{/if}
