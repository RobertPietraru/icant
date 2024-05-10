import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { signupFormSchema } from './user-signup-form.svelte';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.model) {
		redirect(303, '/app');
	}

	const form = await superValidate(zod(signupFormSchema));
	return {
		form: form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, zod(signupFormSchema));
		if (!form.valid) {
			return fail(400, { form, message: undefined });
		}
		const data = form.data;

		const email = data.email;
		const password = data.password;

		try {
			await event.locals.pb.collection('users').create({
                email: email,
                password: password,
                passwordConfirm: password,
            });
			await event.locals.pb
				.collection('users')
				.authWithPassword(email, password);
		} catch (error) {
			const errorObj = error as ClientResponseError;
            console.log("last", error);
			return fail(500, { fail: true, message: errorObj.data.message });
		}

		redirect(303, '/app');
	}
};
