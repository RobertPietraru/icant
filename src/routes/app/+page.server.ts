/// redirect to login if user is not authenticated
/// redirect to profile creation if user has no profiles

import { redirect } from "@sveltejs/kit";

/// load first profile if user has profiles
export const load = (async ({ locals }) => { 
     const user = locals.pb.authStore.model;
     if (!user) redirect(303, '/auth/login');

     const profiles = await locals.pb.collection('profile').getList(1, 1, { filter: `creator="${user.id}"` });
     if (profiles.items.length === 0) redirect(303, '/profile/creation');
     const profile = profiles.items[0];


     redirect(303, `/app/${profile.id}/dashboard`);
});
     