<script>
	import Nav from '../components/Nav.svelte'
	import Bulma from '../bulma/Bulma.svelte'
	import { onMount, afterUpdate } from 'svelte'
	import feather from 'feather-icons'
	
	export let segment;
	

	/**
	 * Iniciamos el Preloader
	 */

	const preload = () => { //Toggle Preloader
		document.querySelector('#preloader').classList.toggle('is-active')
	}	

	onMount(() => { //Trigger Preloader
		setTimeout(() => {
			console.log("¡Estamos en vivo!")
			feather.replace()
			preload()
		}, 1000)
	})

	afterUpdate(() => {
		feather.replace()
	})


</script>

<Bulma />

<style global lang="sass">
</style>

<svelte:head>
	<script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
</svelte:head>

<div id="preloader" class="pageloader is-active"><span class="title">FIMPU 2020</span></div>
<Nav {segment} />

<main>
	<slot></slot>
</main>