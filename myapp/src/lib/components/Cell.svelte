<script lang="ts">
	export let value: number;
	export let rowIndex: number;
	export let colIndex: number;

	const colors: { [key: number]: string } = {
		0: 'white',
		1: 'black',
		2: 'gray',
	};
</script>

<div class="cell" style="background-color: {colors[value]};" on:click></div>

<style>
	.cell {
		width: 40py;
		height: 40px;
		border: 1px solid #000;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
