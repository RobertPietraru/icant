<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import mentorImage from '$lib/assets/profile/mentor.svg';
	import studentImage from '$lib/assets/profile/student.svg';
	import teacherImage from '$lib/assets/profile/teacher.svg';
	import teacherMaleImage from '$lib/assets/profile/teacher_male.svg';
	import type { SmallProfile } from '../../+layout.server';
	import type { SmallListing } from '../../dashboard/+page.server';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	export let listing: SmallListing;
	export let profile: SmallProfile;
	export let user_profile_id : string;

	var image: string;
	switch (profile.type) {
		case 'mentor':
			image = mentorImage;
			break;
		case 'teacher':
			if (profile.gender == 'female') {
				image = teacherImage;
			} else {
				image = teacherMaleImage;
			}
			break;
		default:
			image = studentImage;
			break;
	}
	/// get from slug
</script>

<Card.Root class="flex flex-col px-10 py-5 w-80">
	<div class="flex flex-row gap-2 w-full m-0 mb-5">
		<img src={image} alt="profile" class="rounded-full w-20 h-20" />
		<div >
			<h1 class="font-bold">{profile.last_name} {profile.first_name}</h1>
			<h2 class="text-md font-bold text-gray-400 ">{listing.price} Lei / {listing.session_duration}h</h2>
			<h2 class="text-md font-bold text-gray-400 ">{listing.subject}</h2>
		</div>
	</div>
	<Card.Title>{listing.title}</Card.Title>
	<Card.Description class="h-20">{listing.description}</Card.Description>
	<Button class="mt-2"  on:click={() => goto(`/app/${user_profile_id}/listings/${listing.id}/schedule`)}>Programeaza</Button>
</Card.Root>
