import { json } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export async function POST(event) {
    try {
        const user = event.locals.pb.authStore.model;
        const body = await event.request.json();
        const student_id = body.student_id;
        const teacher_id = body.teacher_id;
        const listing_id = body.listing_id;
        const start_date = body.start_date;
        const end_date = body.end_date;
        console.log(body);

        if (!student_id) {
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
        const session = await event.locals.pb.collection('sessions').create({
            student: student_id,
            teacher: teacher_id,
            listing: listing_id,
            start_date: start_date,
            end_date: end_date,
            teacher_confirmed: false,
            google_meet_link: undefined,
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