/// redirect to login if user is not authenticated
/// redirect to profile creation if user has no profiles

import type { ProfileType } from "$lib/models/profile.js";
import { redirect } from "@sveltejs/kit";

/// load first profile if user has profiles
export const load = (async ({ locals, params }) => {
    const profileId = params.profile_id
    redirect(303, `/app/${profileId}/student_calendar`);
});
