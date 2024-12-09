import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import DataBase from '$lib/server/database.js';

export const GET: RequestHandler = async (req) => {
	const users = await DataBase.users.findUnique({
		where: { id: Number(req.cookies.get('userid')!) },
	});

	const progress = await DataBase.progress.findUnique({
		where: { id: Number(req.cookies.get('userid')!) },
	});

	return json({ ...users, id: req.cookies.get('userid'), currentprogress: 0, level: 1, ...progress});
};
