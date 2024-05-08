import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { ClientResponseError, RecordModel } from "pocketbase";
import type { Profile } from "$lib/models/profile";
import { listingUpdateFormSchema } from "./ListingUpdateForm.svelte";

export const load: PageServerLoad = async ({ locals, params }) => {
    const user = locals.pb.authStore.model;
    const listing_id = params.listing_id;

    if (!user) redirect(303, '/auth/login');
    if (!listing_id) { redirect(303, '/app'); }
    /// get all profiles from the user (user has many profiles)

    var listing: RecordModel;
    try {
        listing = await locals.pb.collection('listings').getOne(listing_id);
    } catch (error) {
        const errorObj = error as ClientResponseError;
        redirect(303, '/app');
    }
    if (!listing) {
        redirect(303, '/app');
    }
    if (listing.user !== user.id) {
        redirect(303, '/app/' + params.profile_id + '/dashboard');
    }


    const form = await superValidate(zod(listingUpdateFormSchema));
    form.data = {
        description: listing.description,
        session_duration: listing.session_duration,
        session_price: listing.session_price,
        title: listing.title,
    }
    return {
        form: form,
    };
};

export const actions: Actions = {
    update: async (event) => {
        const profile_id = event.params.profile_id;
        const form = await superValidate(event, zod(listingUpdateFormSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        const listing_id = event.params.listing_id;
        if (!listing_id) {
            return redirect(303, `/app/${profile_id}/dashboard`);
        }

        /// update user profile with the new data from the form
        const data = form.data;
        try {
            const listing = await event.locals.pb.collection('listings').getOne(listing_id);


            event.locals.pb.collection('listings').update(listing_id, {
                ...listing,
                description: data.description,
                session_duration: data.session_duration,
                session_price: data.session_price,
                title: data.title,
            });

            form.data = {
                description: data.description,
                session_duration: data.session_duration,
                session_price: data.session_price,
                title: data.title,
            };
        } catch (error) {
            const errorObj = error as ClientResponseError;
            console.log(errorObj.message)
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
