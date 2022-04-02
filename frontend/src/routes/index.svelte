<script lang="ts">
	import { onMount } from 'svelte';
	import Search from 'carbon-components-svelte/src/Search/Search.svelte';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import axios from 'axios';
	import { defaultEvmStores, web3 } from 'svelte-web3';

	let userAddress: string;
	let searchTerm = '';
	let coins = [];
	let jwt = undefined;

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
					signal: stopSearch.signal,
					headers: { Authorization: 'Bearer ' + jwt }
				})
				.then((result) => (coins = result.data.coins));
		}
	}

	const login = () => {
		$web3.eth.getAccounts().then(([address]) => {
			axios
				.post('http://localhost:5000/api/login/1', { address })
				.then(({ data }) => $web3.eth.personal.sign(data.toString(), address, undefined))
				.then((signature) =>
					axios.post('http://localhost:5000/api/login/2', {
						address,
						signature
					})
				)
				.then((result) => (jwt = result.data));
		});
	};

	onMount(() => {
		defaultEvmStores.setProvider();
		userAddress = window?.ethereum.selectedAddress;
	});
</script>

<div class="flex">
	<Button class="" kind="tertiary">Добавить портфолио</Button>
	{#if $web3}
		<Button kind="tertiary" on:click={login}>Логин</Button>
	{/if}
</div>

<div class="flex items-center mb-3">
	<span class="whitespace-nowrap">Your ID is:</span>
	{#if userAddress}
		<span class="font-bold">{userAddress}</span>
	{:else}
		Please connect your MetaMask
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
