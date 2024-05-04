/// redirect to login if user is not authenticated
/// redirect to profile creation if user has no profiles

import { redirect } from "@sveltejs/kit";

/// load first profile if user has profiles
export const load = (async ({ locals }) => { 
     const user = locals.pb.authStore.model;
     if (!user) redirect(303, '/auth/login');

     redirect(303, `/app/settings/account`);
});
     