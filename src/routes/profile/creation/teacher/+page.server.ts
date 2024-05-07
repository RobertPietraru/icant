import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { profileFormSchema } from "./profile-form.svelte";

export const load: PageServerLoad = async ({ locals, params }) => {
    const user = locals.pb.authStore.model;

    if (!user) redirect(303, '/auth/login');

    var areProfesor = false;
    try {
        const profiles = await locals.pb.collection('profile').getList(1, 10, { filter: `creator="${user.id}"` });
        areProfesor = profiles.items.some(profile => profile.type === "teacher");
    } catch (error) {
        console.error(error);
    }

    if (areProfesor) {
        redirect(303, '/app');
    }

    return {
        form: await superValidate(zod(profileFormSchema)),
    };
};

export const actions: Actions = {
    create: async (event) => {
        const form = await superValidate(event, zod(profileFormSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        /// update user profile with the new data from the form
        const data = form.data;
        var profile_id : string | undefined= undefined;
        try {
            /// get current user
            const user = event.locals.pb.authStore.model;

            if (!user) {
                return fail(401, { fail: true, message: 'Unauthorized' });
            }

            const profile = await event.locals.pb.collection('profile').create({
                first_name: data.first_name,
                last_name: data.last_name,
                bio: data.bio,
                gender: data.gender,
                creator: user.id, type: 'teacher',
            });
            profile_id = profile.id;
        } catch (error) {
            const errorObj = error as ClientResponseError;
            return fail(500, { fail: true, message: errorObj.data.message });
        }

        redirect(303, `/app/${profile_id}/dashboard`);
    },
};