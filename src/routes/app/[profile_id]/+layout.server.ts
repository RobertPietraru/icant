import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { Profile } from '$lib/models/profile';
import { serializeNonPOJOs } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

export interface SmallProfile {
    id: string;
    first_name: string;
    last_name: string;

}
export const load: LayoutServerLoad = (async ({ locals, params }) => {
    const user = locals.pb.authStore.model;
    const profileId = params.profile_id;
    if (!user) {
        return { user: undefined }
    }

    var profiles: ListResult<RecordModel>;
    try {
        profiles = await locals.pb.collection('profile').getList(1, 50, {
            filter: `creator="${user.id}"`,
            requestKey: null,
        });
    } catch (error) {
        const errorObj = error as ClientResponseError;
        console.log(errorObj);
        return { user: undefined };
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
    const p = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        photo: profile.photo,
        type: profile.type,
    } as Profile


    return { user: serializeNonPOJOs(locals.pb.authStore.model), profiles: mappedProfiles, profileId, profile: p };

}) satisfies LayoutServerLoad;