import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { loginFormSchema } from './user-login-form.svelte';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.pb.authStore.model;
	if (user) redirect(303, '/app');

	/// get all profiles from the user (user has many profiles)

	const form = await superValidate(zod(loginFormSchema));
	return {
		form: form
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, { form , message: undefined});
		}
		const data = form.data;

		const email = data.email;
		const password = data.password;

		console.log(email, password);

		try {
			await event.locals.pb.collection('users').authWithPassword(email, password);
		} catch (error) {
			const errorObj = error as ClientResponseError;
			return fail(401, { fail: true, message: 'Email sau parola gresita', form: form });
		}
		redirect(303, '/app');
	}
};
