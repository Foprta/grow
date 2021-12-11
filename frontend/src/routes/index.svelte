<script lang="ts">
	import { onMount } from 'svelte';
	import InlineLoading from 'carbon-components-svelte/src/InlineLoading/InlineLoading.svelte';
	import Search from 'carbon-components-svelte/src/Search/Search.svelte';

	let userId: string;
	let searchTerm = '';
	let coins = [];

	$: {
		if (!searchTerm) {
			coins = [];
		} else {
		const url = new URL("http://localhost:5000/api/coins/search");
		url.searchParams.append("name", searchTerm);

		fetch(url).then(r => r.json()).then(result => coins = result.coins)	
		}
	}

	onMount(() => {
		userId = localStorage.getItem('userId');

		if (!userId) {
			fetch('http://localhost:5000/api/user', { method: 'POST' })
				.then((r) => r.text())
				.then((newUserId) => {
					userId = newUserId;

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
			<li class="py-5 px-12 hover:bg-gray-200">{coin.name} <span class="text-gray-500">{coin.slug}</span></li>
		{/each}
	</ul>
</div>
