<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="hero is-danger is-fullheight">
	<div class="hero-body">
		<div class="container">
			<h1 class="title is-1 is-uppercase">{status}</h1>
			<p class="subtitle is-uppercase">{error.message}</p>
			<a href="/" class="button is-primary">Volver al Inicio</a>
		</div>
	</div>
</div>



{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
