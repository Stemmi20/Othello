<script lang="ts">
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	$: width = 0;

	export let close: Function;
	let login = 'Login';

	onMount(() => {
		if (Cookies.get('userid')) login = 'Logout';
	});
</script>

<div
	id="menu"
	class=" {width > 700 ? 'bg-red-7' : ''} p-1rem w-[100%] m-0 text-white flex {width > 700
		? 'flex-row'
		: 'flex-col'} justify-between items-center"
>
	<div
		class="flex {width > 700
			? 'flex-row'
			: 'flex-col'} justify-center justify-start items-center gap-3 text-white"
	>
		<a class="bg-[#0074f8] px-8px py-4px border-rd-8px enlarge">⚪</a>
		<a class="bg-[#0074f8] px-8px py-4px border-rd-8px enlarge">⚫</a>
	</div>
</div>