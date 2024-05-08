import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { Profile } from '$lib/models/profile';
import { serializeNonPOJOs } from '$lib/utils';
import type { LayoutServerLoad } from './$types';
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

    var profiles: ListResult<RecordModel>;
    try {
        profiles = await locals.pb.collection('profile').getList(1, 50, {
            filter: `creator="${user.id}"`,
            requestKey: null,
        });
    } catch (error) {
        const errorObj = error as ClientResponseError;
        redirect(303, '/profile/creation');
    }

    const mappedProfiles = profiles.items.map((profile) => {
        const p: SmallProfile = {
            id: profile.id,
            first_name: profile.first_name,
            last_name: profile.last_name,
        };

        return p;
    });
    const profile = (profiles.items.find((p) => p.id === profileId))!;
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


    return { user: serializeNonPOJOs(user), profiles: mappedProfiles, profileId, profile: p };

}) satisfies LayoutServerLoad;