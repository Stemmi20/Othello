<script lang="ts">
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { progress } from '@prisma/client';

	export let data: PageServerData;

	let leaderboard: (progress & { name: string })[] = [];
	$: leaderboard = [];

	onMount(async () => {
		const res = await fetch('/api/leaderboard');
		const json = await res.json();
		leaderboard = json;
	});
</script>

<div class="game-board ml-10 mt-10 grid-container">
	<div class="toprow">Username</div>
	<div class="toprow">Level</div>
	<div class="toprow">currentprogress</div>

	{#each leaderboard as t, i}
		<Leaderboard username={t.name} level={t.level} currentprogress={t.currentprogress} />
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-column: 1 / 3;
	}
	.game-board {
		display: grid;
		grid-template-rows: 20px 20px 20px;
		grid-template-columns: 200px 200px 200px;
	}
	.toprow {
		background: #497b5f;
		border: 1px solid #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
</style>
