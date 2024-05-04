import { serializeNonPOJOs } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { ProfileType, Profile } from '$lib/models/profile';

export const load : PageServerLoad = (async ({ locals, params }) => {
    console.log('loadedbbg');
    const user = locals.pb.authStore.model;
    const profile_id = params.profile_id;
    console.log('loadedbbg1');

    if (!user) redirect(303, '/auth/login');
    if (!profile_id) {
        console.log('redirected');
        redirect(303, '/app');};
    /// get all profiles from the user (user has many profiles)

    console.log('loadedbbg2');
    var profile : RecordModel;
    try {
        profile = await locals.pb.collection('profile').getOne(profile_id);
    } catch (error) {
        const errorObj = error as ClientResponseError;
        console.log(errorObj);
        redirect(303, '/app');
    }

    const p :Profile = {
        id: profile.id,
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

    console.log('loadedbbg4');
    return { user: serializeNonPOJOs(user), profile : p};
}) satisfies PageServerLoad;