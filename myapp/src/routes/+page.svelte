<script lang="ts">
	// import Task from '$lib/components/Task.svelte';
	// import { onMount } from 'svelte';
	// import type { PageServerData } from './$types';
	// import type { task as TaskType } from '@prisma/client';
	// export let data: PageServerData;
	// export let maxprogress = 100;
	// export let currentprogress = 0;
	// export let level = 1;
	// export let precent = 0;

	// let task: TaskType[] = [];
	// $: task = [];

	// onMount(async () => {
	// 	const taskres = await fetch('/api/task');
	// 	const taskjson = await taskres.json();
	// 	task = taskjson;

	// 	const userres = await fetch('/api/userprogress');
	// 	const userjson = await userres.json();

	// 	currentprogress = userjson.currentprogress;
	// 	level = userjson.level;
	// 	maxprogress = userjson.level * 100;

	// 	procentige();
	// });

	// function doDB() {
	// 	fetch('/api/userprogress', {
	// 		method: 'PATCH',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ currentprogress, level }),
	// 	});
	// }

	// function increaseProgess(xpAmount: number, id: number) {
	// 	currentprogress = currentprogress + xpAmount;

	// 	completeTask(id);
	// 	procentige();
	// 	levelUp();
	// 	doDB();
	// }

	// function levelUp() {
	// 	if (precent >= 100) {
	// 		level = level + 1;
	// 		maxprogress = maxprogress * 2;
	// 		precent = precent = 0;
	// 		currentprogress = currentprogress % 100;
	// 	}
	// }

	// function completeTask(id: number) {
	// 	fetch('/api/task', {
	// 		method: 'DELETE',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ taskid: id }),
	// 	});
	// 	task = task.filter((t) => t.id !== id);
	// }
	// function procentige() {
	// 	precent = (currentprogress / maxprogress) * 100;
	// }

	let rows: number = 8;
	let cols: number = 8;
	let arr: string[][] = [];
	for (let i = 0; i < rows; i++) {
		arr[i] = []
		for (let j = 0; j < cols; j++) {
			arr[i][j] = String.fromCharCode(65 + i) + (j + 1);
		}
	}
	console.log(arr);
</script>



<div class="game-board ml-10 mt-10 grid-container">
	<div class="toprow"></div>
	<div class="toprow">A</div>
	<div class="toprow">B</div>
	<div class="toprow">C</div>
	<div class="toprow">D</div>
	<div class="toprow">E</div>
	<div class="toprow">F</div>
	<div class="toprow">G</div>
	<div class="toprow">H</div>

	<!-- {#each leaderboard as t, i}
		<Leaderboard username={t.name} level={t.level} currentprogress={t.currentprogress} />
	{/each} -->
</div>

<style>
	.grid-container {
		display: grid;
		grid-column: 1 / 9;
	}
	.game-board {
		display: grid;
		grid-template-rows: 200px 200px 200px;
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
