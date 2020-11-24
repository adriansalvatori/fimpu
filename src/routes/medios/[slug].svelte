<script context="module">

	import Admin from "../../components/Admin.svelte"
	import StandA from '../../components/StandA.svelte'
	import StandB from '../../components/StandB.svelte'

	export async function preload({
		params,
		query
	}) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`medios/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return {
				stand: data
			};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<style lang="scss">
	#stand {
		background-position: bottom !important;
		background-size: cover !important;
		background-repeat: no-repeat !important;
	}

	$gradient: linear-gradient(71deg, rgba(161, 0, 224, 1) 0%, rgba(231, 60, 41, 1) 100%);

	.button#volver {
		background: $gradient;

		.icon {
			background: white;
			color: black;
			height: 50px;
			width: 50px;
			margin-left: -25px;
			margin-right: 20px;
		}
	}
</style>

<script>
	export let stand;
</script>

<svelte:head>
	<title>{stand.title} - FIMPU</title>
</svelte:head>

<Admin/>
<section id="stand" class="hero is-fullheight" style="background:url({stand.background})">
	<div class="hero-body">
		{#if stand.type === 'a'}
			<StandA {stand}/>
		{:else}
			<StandB {stand}/>
		{/if}
	</div>
	<div class="hero-footer">
		<div class="container">
			<a href="/medios" id="volver" class="button is-primary has-margin-bottom-50"><span class="icon is-small"><i
						data-feather="chevrons-left"></i></span><span>Volver a Medios</span></a>
		</div>
	</div>
</section>