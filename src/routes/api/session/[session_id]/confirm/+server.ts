import { json } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export async function POST(event) {
    try {
        const session_id = event.params.session_id;
        const user = event.locals.pb.authStore.model;
        if (!session_id) {
            return json({
                code: 400,
                status: 'error',
                error: 'Bad Request',
            });
        }
        if (!user) {
            return json({
                code: 401,
                status: 'error',
                error: 'Unauthorized',
            });
        }
        const session = await event.locals.pb.collection('sessions').getOne(session_id);
        if (!session) {
            return json({
                code: 404,
                status: 'error',
                error: 'Not Found',
            });
        }
        //TODO: add security

        await event.locals.pb.collection('sessions').update(session_id, {
            ...session,
            teacher_confirmed: true,
        });

        return json({
            code: 200,
            status: 'success',
        });

    } catch (error) {
        const errorObj = error as ClientResponseError;
        return json({
            code: 500,
            status: 'error',
            error: errorObj.data.message,
        });

    }
}