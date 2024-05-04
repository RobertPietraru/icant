import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { LayoutServerLoad } from './$types';
import type { Profile } from '$lib/models/profile';
import { serializeNonPOJOs } from '$lib/utils';

export interface SmallProfile {
    id: string;
    first_name: string;
    last_name: string;

}
export const load = (async ({ locals }) => {
    console.log('loading');
    const user = locals.pb.authStore.model;
    if (!user) {
        return { user: undefined }
    }
    console.log('loaded user');

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
    console.log('loaded profiles');

    const mappedProfiles = profiles.items.map((profile) => {
        const p: SmallProfile = {
            id: profile.id,
            first_name: profile.first_name,
            last_name: profile.last_name,
        };

        return p;
    });
    console.log(mappedProfiles);
    return { user: serializeNonPOJOs(locals.pb.authStore.model), profiles: mappedProfiles };

}) satisfies LayoutServerLoad;