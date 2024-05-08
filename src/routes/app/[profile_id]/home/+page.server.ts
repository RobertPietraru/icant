import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { Profile } from '$lib/models/profile';
import { serializeNonPOJOs } from '$lib/utils';
import type { LayoutServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export interface SmallProfile {
    id: string;
    first_name: string;
    last_name: string;

}
export const load: LayoutServerLoad = (async ({ locals, params }) => {
    const user = locals.pb.authStore.model;
    const profileId = params.profile_id;
    if (!user) {
        redirect(303, '/auth/login');
    }

    var profile: RecordModel | undefined;

    try {
        profile = await locals.pb.collection('profile').getOne(profileId);
    } catch (error) {
        const errorObj = error as ClientResponseError;
        profile = undefined;
    }

    if (!profile) {
        redirect(303, '/profile/creation');
    }

    const p = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        photo: profile.photo,
        type: profile.type,
    } as Profile
    if (!profile) {
        redirect(303, '/profile/creation');
    }

    if (profile.type !== 'student') {
        redirect(303, `/app/${profile.id}/dashboard`);
    }


    return {  profile: p };

}) satisfies LayoutServerLoad;