import type { SmallListing } from '../../../dashboard/+page.server';
import type { PageLoad } from './$types';
import type { SmallSession } from './+page.server';


export interface CalendarBlock {
    cells: number;
    hourIndex: number;
    session: SmallSession | undefined
}

export interface CalendarDay {
    dayIndex: number;

    blocks: CalendarBlock[];
}

export const load: PageLoad = ({ params, data }) => {
    var calendar: CalendarDay[] = [];

    const initialAtMidnight = new Date();
    initialAtMidnight.setHours(0, 0, 0, 0);
    const oneWeekFromNow = new Date(initialAtMidnight.getTime() + 7 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 7; i++) {
        const todayAtMidnight = new Date(initialAtMidnight.getTime() + (i) * 24 * 60 * 60 * 1000);
        const tomorrowAtMidnight = new Date(initialAtMidnight.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
        const blocks: CalendarBlock[] = [];

        const sessions = data.sessions.filter((s) => {
            return s.start_date.getTime() >= todayAtMidnight.getTime() && s.start_date.getTime() < tomorrowAtMidnight.getTime();
        });
        /// sort the sessions by start date
        sessions.sort((a, b) => {
            return a.start_date.getTime() - b.start_date.getTime();
        });
        let j = 0;
        while (j < 12) {
            if (sessions.length === 0) {
                blocks.push({ cells: 1, hourIndex: j, session: undefined })
                j++;
                continue;
            }
            const earliest_session = sessions[0];
            sessions.shift();

            while (earliest_session.start_date.getHours() > j + 8) {
                blocks.push({ cells: 1, hourIndex: j, session: undefined })
                j++
            }

            const nr_cells = earliest_session.end_date.getHours() - earliest_session.start_date.getHours()
            blocks.push({
                cells: nr_cells,
                hourIndex: j,
                session: earliest_session
            } as CalendarBlock)
            j += nr_cells;
        }
        calendar.push({ dayIndex: i, blocks });

    }
    var newListing = !data.listing ? undefined : {
            title: data.listing.title,
            description: data.listing.description,
            created_at: new Date(data.listing.created),
            id: data.listing.id,
            modified_at: new Date(data.listing.modified),
            price: data.listing.session_price,
            session_duration: data.listing.session_duration,
            subject: data.listing.subject,
            teacher_id: data.listing.id,
        } as SmallListing;
    return { calendar, listing: newListing};

    /// get all the sessions for the student and group them by date
};