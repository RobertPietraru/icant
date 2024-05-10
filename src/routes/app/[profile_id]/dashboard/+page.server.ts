import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { Profile } from '$lib/models/profile';
import { serializeNonPOJOs } from '$lib/utils';
import type { LayoutServerLoad } from '../$types';
import { redirect, type Actions } from '@sveltejs/kit';

export interface SmallListing {
    subject: string;
    id: string;
    title: string;
    description: string;
    price: number;
    session_duration: number;
    created_at: Date;
    modified_at: Date;
}
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

    if (profile.type === 'student') {
        redirect(303, `/app/${profile.id}/home`);
    }

    try {
        const listings = await locals.pb.collection('listings').getList(1, 50, { filter: `profile="${profile.id}"` });
        const actualListings = listings.items.map((l) => {
            return {
                id: l.id,
                title: l.title,
                description: l.description,
                price: l.session_price,
                session_duration: l.session_duration,
                created_at: new Date(l.created),
                modified_at: new Date(l.updated),
                    subject: l.subject
            } as SmallListing;
        }
        );

        return { user: serializeNonPOJOs(user), profileId, profile: p, listings: actualListings, batch_size: listings.perPage, total_items: listings.totalItems, page: listings.page };
    } catch (error) {
        return { user: serializeNonPOJOs(user), profileId, profile: p, listings: [], batch_size: 0, total_items: 0, page: 1 };

    }
}) satisfies LayoutServerLoad;