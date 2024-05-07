/// redirect to login if user is not authenticated
/// redirect to profile creation if user has no profiles

import type { ProfileType } from "$lib/models/profile.js";
import { redirect } from "@sveltejs/kit";

/// load first profile if user has profiles
export const load = (async ({ locals }) => {
    const user = locals.pb.authStore.model;
    if (!user) redirect(303, '/auth/login');

    const profiles = await locals.pb.collection('profile').getList(1, 1, { filter: `creator="${user.id}"` });
    if (profiles.items.length === 0) redirect(303, '/profile/creation');
    const profile = profiles.items[0];
    if (!profile) redirect(303, '/profile/creation');

    const type: ProfileType = profile.type;
    if (type == 'student') {
        redirect(303, `/app/${profile.id}/search`);
    }
    else {
        redirect(303, `/app/${profile.id}/dashboard`);
    }


});
