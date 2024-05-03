import { serializeNonPOJOs } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const user = locals.pb.authStore.model;
    if (!user) redirect(303, '/auth/login');
    /// get all profiles from the user (user has many profiles)
    try {

        const profiles = await locals.pb.collection("profiles").getFullList({
            filter: `creator="${user.id}"`
        })

        return { user: serializeNonPOJOs(user), profiles: serializeNonPOJOs(profiles) };
    } catch (error) {
        redirect(303, '/profile/creation');

    }
}) satisfies PageServerLoad;

export const actions = {
    logout: async ({ locals }) => {
        locals.pb.authStore.clear();
        redirect(303, '/auth/login');
    }
}