import { json } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export async function POST(event) {
    try {
        const listing_id = event.params.listing_id;
        const user = event.locals.pb.authStore.model;
        if (!listing_id) {
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
        const listing = await event.locals.pb.collection('listings').getOne(listing_id);
        if (!listing) {
            return json({
                code: 404,
                status: 'error',
                error: 'Not Found',
            });
        }
        if (listing.user !== user.id) {
            return json({
                code: 403,
                status: 'error',
                error: 'Forbidden',
            });
        }

        await event.locals.pb.collection('listings').delete(listing_id);
         
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