// import { fail, redirect, type Action } from '@sveltejs/kit';
// import type { ClientResponseError } from 'pocketbase';
// import type { PageServerLoad } from './$types';

// export const load = (async ({locals}) => {    
//     if (locals.pb.authStore.model) {
//         redirect(303, '/app')
//     }

//     return {};
// }) satisfies PageServerLoad;

// export const actions : Action = {
//     register: async ({ event }) => {
// 		try {
// 			await event.locals.pb.collection('users').create({
                 
//             });
// 			await event.locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
// 		} catch (error) {
// 			const errorObj = error as ClientResponseError;
//             return fail(500, {fail: true, message: errorObj.data.message});
//         } 
		
// 		redirect(303, '/app');
// 	},
// }