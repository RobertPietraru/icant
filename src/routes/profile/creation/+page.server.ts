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

        if (profiles.length === 0) {
            redirect(303, '/dashboard');
        }

    } catch (error) {
        return { user: serializeNonPOJOs(user)};
    }
}) satisfies PageServerLoad;