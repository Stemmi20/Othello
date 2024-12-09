import type { PageServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

const tempData: {lastFetch: number, data: {players:{now:number}}} = {lastFetch: 0, data: {players:{now: 0}}};

export const load: PageServerLoad = async (event) => {
    const isTooOld = tempData.lastFetch < Date.now() - 600000;
    const token = event.cookies.get('token');
	if (!token) return redirect(307, '/login');
    if (isTooOld) {
        tempData.data = await initServerData() as any;
        tempData.lastFetch = Date.now();
    }
    return {data: tempData.data};
};	

async function initServerData() {
    const url = 'https://mcapi.us/server/status?ip=mc.stemm1.org&port=25565';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching WRC quote: ${response.statusText}`);
        }
        const data: { players:{now:number} } = await response.json();
        return data.players;
    } catch (error) {
        console.error('Error:', error);
    }
}