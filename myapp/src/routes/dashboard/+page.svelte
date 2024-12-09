<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { progress, users } from '@prisma/client';

	export let data: PageServerData;

	let user: (users & progress) | null = null;
	$: user = null;

	onMount(async () => {
		const res = await fetch('/api/dashboard');
		const json = await res.json();
		user = json;
	});
</script>

<div class="color-white m-10">
	<div>
		Username:
		{user?.username}
	</div>
	<div>
		Level:
		{user?.level}
	</div>
	<div>
		TotalXP:
		{new Array(user?.level ?? 0).fill(null).reduce((a, b, i) => (i + 1) * 100 + b + a, user?.currentprogress)}XP
	</div>
	<div>
		Aufgaben Abgeschlossen:
		{user?.taskscompleted}
	</div>
</div>

<style>
</style>
