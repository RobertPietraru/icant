import type { ClientResponseError, ListResult, RecordModel } from 'pocketbase';
import type { Profile } from '$lib/models/profile';
import { serializeNonPOJOs } from '$lib/utils';
import type { LayoutServerLoad } from '../../$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { today } from '@internationalized/date';

export interface SmallSession {
    id: string;
    student_id: string;
    teacher_id: string;
    start_date: Date;
    end_date: Date;
    teacher_confirmed: boolean;
}
function formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetSign = timezoneOffset > 0 ? '-' : '+';
    const timezoneOffsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const timezoneOffsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffsetSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;
}

export const load: LayoutServerLoad = (async ({ locals, params }) => {
    const user = locals.pb.authStore.model;
    const profileId = params.profile_id;
    if (!user) {
        redirect(303, '/auth/login');
    }
    
    try {
        /// start date today and end date 1 week from now
        const todayAtMidnight = new Date();
        todayAtMidnight.setHours(0,0,0,0);
        const oneWeekFromNow = new Date(todayAtMidnight.getTime() + 7 * 24 * 60 * 60 * 1000);

        const sessions = await locals.pb.collection('sessions').getList(1, 50, { filter: `student="${profileId}" && start_date>="${formatDate(todayAtMidnight)}" && end_date<="${formatDate(oneWeekFromNow)}"`  });

        const mapped_sesions = sessions.items.map((s) => {
            return {
                id: s.id,
                student_id: s.student,
                teacher_id: s.teacher,
                start_date: new Date(s.start_date),
                end_date: new Date(s.end_date),
                teacher_confirmed: s.teacher_confirmed
            } as SmallSession;
        });

        return {sessions: mapped_sesions};
    } catch (error) {
        console.log(error);
        return {sessions: []};
    }



}) satisfies LayoutServerLoad;