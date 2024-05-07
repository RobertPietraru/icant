import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { ClientResponseError, RecordModel } from "pocketbase";
import type { Profile } from "$lib/models/profile";
import { listingFormSchema } from "./listing_creation_form.svelte";

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.pb.authStore.model;
	const profile_id = params.profile_id;

	if (!user) redirect(303, '/auth/login');
	if (!profile_id) {
		console.log('redirected');
		redirect(303, '/app');
	};
    const form = await superValidate(zod(listingFormSchema));
	return {
		form: form,
	};
};

export const actions: Actions = {
	create: async (event) => {

	},
};
 