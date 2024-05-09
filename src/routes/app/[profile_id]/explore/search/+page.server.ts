import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { SmallListing } from '../../dashboard/+page.server';
import type { SmallProfile } from '../../+layout.server';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const user = locals.pb.authStore.model;
	const profile_id = params.profile_id;

	if (!user) redirect(303, '/auth/login');
	if (!profile_id) {
		redirect(303, '/app');
	}

	const searchTerm = url.searchParams.get('searchTerm');
	console.log(searchTerm)

	/// get 5 listings
	try {
		const query = searchTerm?.split(' ').map((term) => `( title ~ "${term}" || description ~ "${term}")`).join(' && ');

		const listings = await locals.pb.collection('listings').getList(1, 20, {
			filter: !query ? undefined : locals.pb.filter(
				query
			)
		});

		/// for each listing also get the profile as ShortProfile. The listing should be ShortListing
		const pairs = await Promise.all(
			listings.items.map(async (listing) => {
				const profile = await locals.pb.collection('profile').getOne(listing.profile, {
					requestKey: null
				});

				return {
					listing: {
						title: listing.title,
						description: listing.description,
						created_at: new Date(listing.created),
						id: listing.id,
						modified_at: new Date(listing.modified),
						price: listing.session_price,
						session_duration: listing.session_duration
					} as SmallListing,
					profile: {
						id: profile.id,
						first_name: profile.first_name,
						last_name: profile.last_name,
						gender: profile.gender,
						type: profile.type
					} as SmallProfile
				};
			})
		);

		return {
			listings: pairs,
		};
	} catch (error) {
		console.error(error);
		return fail(500, { fail: true, message: 'Server Error' });
	}
};
