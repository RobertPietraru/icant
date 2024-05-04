import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load : PageServerLoad= (async ({locals}) => {    
    if (locals.pb.authStore.model) {
        redirect(303, '/app')
    }

    return {};
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ locals, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        
        if (!email || !password) {
            return fail(400, { emailRequired: email === null, passwordRequired: password === null });
        }

        try {
            await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
        } catch (error) {
            const errorObj = error as ClientResponseError;
            return fail(500, {fail: true, message: errorObj.data.message});
        }

         redirect(303, '/app');
    },
    reset: async ({ locals, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        
        if (!email) {
            return fail(400, { emailRequired: email === null });
        }

        try {
            await locals.pb.collection('users').requestPasswordReset(email.toString());
        } catch (error) {
            const errorObj = error as ClientResponseError;
            return fail(500, {fail: true, message: errorObj.data.message});
        }

         redirect(303, '/login');
    },
}satisfies Actions;