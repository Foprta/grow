<script lang="ts">
	import { onMount } from 'svelte';
	import InlineLoading from 'carbon-components-svelte/src/InlineLoading/InlineLoading.svelte';
	import Search from 'carbon-components-svelte/src/Search/Search.svelte';
	import axios from 'axios';

	let userId: string;
	let searchTerm = '';
	let coins = [];

	let stopSearch = new AbortController();

	$: {
		stopSearch.abort();

		if (!searchTerm) {
			coins = [];
		} else {
			stopSearch = new AbortController();

			axios
				.get('http://localhost:5000/api/coins/search', {
					params: { name: searchTerm },
					signal: stopSearch.signal
				})
				.then((result) => (coins = result.data.coins));
		}
	}

	onMount(() => {
		userId = localStorage.getItem('userId');

		if (!userId) {
			axios.post('http://localhost:5000/api/user').then((res) => {
				userId = res.data;

				localStorage.setItem('userId', userId);
			});
		}
	});
</script>

<div class="flex items-center mb-3">
	<span class="whitespace-nowrap">Your ID is:</span>
	{#if userId}
		<span class="font-bold">{userId}</span>
	{:else}
		<InlineLoading small class="ml-3" />
	{/if}
</div>

<div class="w-[400px]">
	<Search bind:value={searchTerm} placeholder="Введите название монеты" light />

	<ul>
		{#each coins as coin}
			<li class="flex items-center py-5 px-3 space-x-3 hover:bg-gray-200 ">
				<img class="inline" width="24" height="24" src={coin.logo} alt={coin.slug} />
				<span>{coin.name}</span>
				<span class="text-gray-500">{coin.slug}</span>
			</li>
		{/each}
	</ul>
</div>
