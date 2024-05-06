import { serializeNonPOJOs } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const user = locals.pb.authStore.model;
    if (!user) redirect(303, '/auth/login');
    /// get all profiles from the user (user has many profiles)
    try {
        const profiles = await locals.pb.collection('profile').getList(1, 10, { filter: `creator="${user.id}"` });

        const hasTeacherProfile = profiles.items.some(profile => profile.type === "teacher");
        const hasMentorProfile = profiles.items.some(profile => profile.type === "mentor");
        console.log("hasTeacherProfile", hasTeacherProfile);

        console.log(profiles);
        return {
            hasTeacherProfile,
            hasMentorProfile,
        };

    } catch (error) {
        console.error(error);
        return {
            hasTeacherProfile: false,
            hasMentorProfile: false,

        }
    }
}) satisfies PageServerLoad;