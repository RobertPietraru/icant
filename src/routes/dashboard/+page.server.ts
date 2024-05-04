import { serializeNonPOJOs } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { ProfileType, Profile } from '$lib/models/profile';

export const load = (async ({ locals }) => {
    const user = locals.pb.authStore.model;
    if (!user) redirect(303, '/auth/login');
    /// get all profiles from the user (user has many profiles)

    var profiles  : ListResult<RecordModel>;
    try {
        profiles = await locals.pb.collection('profile').getList(1, 1, {
            filter: `creator="${user.id}"`,
        });
    } catch (error) {
        const errorObj = error as ClientResponseError;
        return fail(500, { fail: true, message: errorObj.data.message });

    }

    if (profiles.items.length === 0) {
        redirect(303, '/profile/creation');
    }
    const mappedProfiles = profiles.items.map((profile) => {
        const p :Profile = {
            first_name: profile.first_name,
            last_name: profile.last_name,
            photo: profile.photo,
            bio: profile.bio,
            gender: profile.gender,
            phone: profile.phone,
            picture: profile.picture,
            type: profile.type,
            date_of_birth: new Date(profile.date_of_birth),
        } ;
        return p;
    });
    return { user: serializeNonPOJOs(user), profiles: serializeNonPOJOs(mappedProfiles) };
}) satisfies PageServerLoad;

export const actions = {
    logout: async ({ locals }) => {
        locals.pb.authStore.clear();
        redirect(303, '/auth/login');
    }
}