import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { profileFormSchema } from "./profile-form.svelte";
import type { PageServerLoad } from "./$types.js";
import type { ClientResponseError, RecordModel } from "pocketbase";
import type { Profile } from "$lib/models/profile";

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.pb.authStore.model;
	const profile_id = params.profile_id;

	if (!user) redirect(303, '/auth/login');
	if (!profile_id) {
		redirect(303, '/app');
	};
	/// get all profiles from the user (user has many profiles)

	var profile: RecordModel;
	try {
		profile = await locals.pb.collection('profile').getOne(profile_id);
	} catch (error) {
		const errorObj = error as ClientResponseError;
		redirect(303, '/app');
	}

	const p: Profile = {
		id: profile.id,
		first_name: profile.first_name,
		last_name: profile.last_name,
		photo: profile.photo,
		bio: profile.bio,
		gender: profile.gender,
		phone: profile.phone,
		picture: profile.picture,
		type: profile.type,
		date_of_birth: new Date(profile.date_of_birth),
	};


	const form = await superValidate(zod(profileFormSchema));
	form.data = {
		first_name: p.first_name,
		last_name: p.last_name,
		gender: p.gender ?? 'male',
		bio: p.bio ?? '',
	}
	return {
		form: form,
	};
};

export const actions: Actions = {
	update: async (event) => {
		const form = await superValidate(event, zod(profileFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const profile_id = event.params.profile_id;
		if (!profile_id) {
			return redirect(303, '/app');
		}

		/// update user profile with the new data from the form
		const data = form.data;
		try {
			const profile = await event.locals.pb.collection('profile').getOne(profile_id);


			event.locals.pb.collection('profile').update(profile_id, {
				...profile,
				first_name: data.first_name,
				last_name: data.last_name,
				bio: data.bio,
				gender: data.gender,
			});

			form.data = {
				first_name: data.first_name,
				last_name: data.last_name,
				bio: data.bio,
				gender: data.gender,
			};

		} catch (error) {
			const errorObj = error as ClientResponseError;
			redirect(303, '/app');
		}
		redirect(303, `/app/${profile_id}/dashboard`);
	},
	delete: async (event) => { 
		const profile_id = event.params.profile_id;
		if (!profile_id) {
			return redirect(303, '/app');
		}
		try {
			await event.locals.pb.collection('profile').delete(profile_id);
		} catch (error) {
			const errorObj = error as ClientResponseError;
			redirect(303, '/app');
		}
		redirect(303, '/app');
	}
};
