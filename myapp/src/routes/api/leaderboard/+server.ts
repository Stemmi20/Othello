import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import DataBase from '$lib/server/database.js';

export const GET: RequestHandler = async (req) => {
	const leaderboard = await DataBase.progress.findMany();
	const users = await DataBase.users.findMany();
	return json(
		leaderboard
			.filter((u) => users.find((u2) => u2.id === u.id)?.leaderboard)
			.map((u) => ({ ...u, name: users.find((u2) => u2.id === u.id)?.username }))
            .sort((b,a)=> a.level-b.level)
	);
};