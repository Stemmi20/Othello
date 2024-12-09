<script lang="ts">
	import Board from './Board.svelte';
	import { createBoard, isValidMove, makeMove } from '$lib/utils/gameLogic';

	let board = createBoard();
	let currentPlayer: 1 | 2 = 1;

	const handleMove = (event: CustomEvent<{ x: number; y: number }>): void => {
    const { x, y } = event.detail;
    if (isValidMove(board, x, y, currentPlayer)) {
      board = makeMove(board, x, y, currentPlayer);
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    } else {
      alert('Invalid move!');
    }
  };
</script>

<main>
	<h1 class="color-white">Othello</h1>
	<Board {board} {currentPlayer} on:move={handleMove} />
</main>

<style>
	.main {
		text-align: center;
	}
</style>
