<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { task as TaskType } from '@prisma/client';
	export let data: PageServerData;
	export let maxprogress = 100;
	export let currentprogress = 0;
	export let level = 1;
	export let precent = 0;

	let task: TaskType[] = [];
	$: task = [];

	onMount(async () => {
		const taskres = await fetch('/api/task');
		const taskjson = await taskres.json();
		task = taskjson;

		const userres = await fetch('/api/userprogress');
		const userjson = await userres.json();

		currentprogress = userjson.currentprogress;
		level = userjson.level;
		maxprogress = userjson.level * 100;

		procentige();
	});

	function doDB() {
		fetch('/api/userprogress', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ currentprogress, level }),
		});
	}

	function increaseProgess(xpAmount: number, id: number) {
		currentprogress = currentprogress + xpAmount;

		completeTask(id);
		procentige();
		levelUp();
		doDB();
	}

	function levelUp() {
		if (precent >= 100) {
			level = level + 1;
			maxprogress = maxprogress * 2;
			precent = precent = 0;
			currentprogress = currentprogress % 100;
		}
	}

	function completeTask(id: number) {
		fetch('/api/task', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ taskid: id }),
		});
		task = task.filter((t) => t.id !== id)
	}
	function procentige() {
		precent = (currentprogress / maxprogress) * 100;
	}
</script>

<div class="flex justify-left items-center text-left bg-black mr-0">
	<div class="h-full flex flex-wrap justify-center items-center p-10 gap-15"></div>
	<div class="color-white mr-5 bg-gray-8 p-2 rounded-lg">{data.username?.username}</div>
	<div class="mr-5 color-white">Level {level}</div>
	<div
		class="progress-container"
		aria-label="Progress bar"
		aria-valuemin="0"
		aria-valuemax={maxprogress}
		aria-valuenow={currentprogress}
	>
		<div class="progress-bar" style="width: {precent}%;"></div>
	</div>
	<div class="ml-5 color-white">{Math.round(precent)}%</div>
	<div class="ml-2 color-white">{Math.round(currentprogress)}xp / {maxprogress}xp</div>
</div>

<div>
	{#each task as t, i}
		{#if i === 0}
			<div class="color-white mt-10 ml-15">Drücke auf die Felder um die Aufgaben abzuschließen</div>
		{/if}
		<Task fn={() => increaseProgess(t.xp, t.id)} taskName={t.name} xpAmount={t.xp} />
	{/each}
</div>

<style>
	.progress-container {
		width: 10%;
		background-color: #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.progress-bar {
		height: 20px;
		background-color: #4caf50;
		width: 0%;
		transition: width 0.3s ease;
		border-radius: 10px 0 0 10px;
	}
</style>
