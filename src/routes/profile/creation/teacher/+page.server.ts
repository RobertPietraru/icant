import { fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    const user = locals.pb.authStore.model;
    if (!user) {
        redirect(303, '/auth/login');
    }
    return {};
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ locals, request }) => {
        const data = await request.formData();
        const firstName = data.get('first_name');
        const lastName = data.get('last_name');
        const dateOfBirth = data.get('date_of_birth');
        const gender = data.get('gender');
        const phone = data.get('phone');
        console.log(data);
        console.log(firstName, lastName, dateOfBirth, gender, phone);

        try {
            /// get current user
            const user = locals.pb.authStore.model;

            if (!user) {
                return fail(401, { fail: true, message: 'Unauthorized' });
            }

            const profile = await locals.pb.collection('profile').create({ first_name: firstName, last_name: lastName, date_of_birth: dateOfBirth, gender: gender, phone: phone, creator: user.id, type: 'teacher', });


        } catch (error) {
            const errorObj = error as ClientResponseError;
            return fail(500, { fail: true, message: errorObj.data.message });
        }

        redirect(303, '/app');
    },
}