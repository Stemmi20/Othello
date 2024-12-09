<script lang="ts">
	let firstname: HTMLFormElement;
	let lastname: HTMLFormElement;
	let leaderboard: boolean = false;
	let form: HTMLFormElement;
	let password: string;

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: error = '';

	const submitpasswordchange = async (
		e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
	) => {
		const formData = new FormData(form, e.submitter);
		const formJSON: { [key: string]: string } = {};
		formData.forEach((val, k) => (formJSON[k] = val.toString().trim()));

		const res = await fetch(`/api/${'changepassword'}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formJSON),
		});
		if (!res.ok) {
			error = await res.json().then((r) => r.message);
			return;
		} else error = 'Password Changed Successfully';
	};
</script>

{#if error.length}
	<div class="border-1px border-red p-2 border-solid w-fit m-auto mb-4 color-white">
		{error}
	</div>
{/if}
<form
	class="flex flex-col justify-center items-center text-center gap-2"
	on:submit={submitpasswordchange}
	bind:this={form}
>
	<div class="flex flex-row">
		<div class="m-5">
			<div class="m-3">
				<input
					type="text"
					name="username"
					placeholder="User Name: {data.username?.username}"
					class="text-center font-size-xl"
					autocomplete="username"
					readonly
				/>
			</div>
			<div class="m-3">
				<input
					type="text"
					name="firstname"
					placeholder="First Name: {data.firstname?.firstname}"
					class="text-center font-size-xl"
					autocomplete="username"
					readonly
				/>
			</div>
			<div class="m-3">
				<input
					type="text"
					name="lastname"
					placeholder="Last Name: {data.lastname?.lastname}"
					class="text-center font-size-xl"
					autocomplete="username"
					readonly
				/>
			</div>
		</div>

		<div class="m5">
			<div class="m-3">
				<input
					type="password"
					name="password"
					placeholder="Old Password"
					class="text-center font-size-xl"
					autocomplete="current-password"
				/>
			</div>
			<div class="m-3">
				<input
					type="password"
					name="newpassword"
					placeholder="New Password"
					class="text-center font-size-xl"
					autocomplete="new-password"
				/>
			</div>
			<div class="m-3">
				<input
					bind:value={password}
					type="password"
					name="confirmpassword"
					placeholder="Confirm Password"
					class="text-center font-size-xl"
					autocomplete="new-password"
				/>
			</div>
			<div>
				<div class="m-2 color-white">Displayed on Leaderboard</div>
				<label class="switch">
					<input type="checkbox" bind:checked={leaderboard} name="leaderboard" />
					<span class="slider round"></span>
				</label>
			</div>
			<div class="flex flex-row justify-center items-center w-full m-auto mt-2">
				<input
					type="submit"
					value="Update Profile"
					class="hover:scale-105 font-size-xl font-bold bg-gradient-to-r from-[#006EFF] via-[#16d410] m-auto to-[#006EFF] bg-[length:200%] p-2 px-6 max-w-min rounded-xl transition-all bg-[position:0%_center] hover:bg-[position:100%_center] font-bold text-shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
				/>
			</div>
		</div>
	</div>
</form>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
