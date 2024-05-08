import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { ClientResponseError, RecordModel } from "pocketbase";
import type { Profile } from "$lib/models/profile";
import { listingFormSchema } from "./ListingCreationForm.svelte";

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.pb.authStore.model;
	const profile_id = params.profile_id;

	if (!user) redirect(303, '/auth/login');
	if (!profile_id) {
		redirect(303, '/app');
	};
    const form = await superValidate(zod(listingFormSchema));
	return {
		form: form,
	};
};

export const actions: Actions = {
	create: async (event) => {
        const profile_id = event.params.profile_id;
		const form = await superValidate(event, zod(listingFormSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        /// update user profile with the new data from the form
        const data = form.data;
        try {
            /// get current user
            const user = event.locals.pb.authStore.model;
            if (!user) {
                return fail(401, { fail: true, message: 'Unauthorized' });
            }

            const listing = await event.locals.pb.collection('listings').create({
                description: data.description,
                title: data.title,
                session_duration: data.session_duration,
                session_price: data.session_price,
                profile: profile_id,
                user: user.id,
            });
        } catch (error) {
            const errorObj = error as ClientResponseError;
            return fail(500, { fail: true, message: errorObj.data.message });
        }

        redirect(303, `/app/${profile_id}/dashboard`); 

	},
};
 