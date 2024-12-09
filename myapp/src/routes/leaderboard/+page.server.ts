import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import DataBase from '$lib/server/database';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('token');
	if (!token) return redirect(307, '/login');

	const user = await DataBase.users.findUnique({
		where: { id: Number(event.cookies.get('userid')) },
		select: { leaderboard: true, username: true },
	});
	const leaderboard = await DataBase.progress.findUnique({
		where: { id: Number(event.cookies.get('userid')) },
		select: { level: true, currentprogress: true },
	});
	return { ...user, ...leaderboard };
};
