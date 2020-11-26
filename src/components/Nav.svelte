<script>
	export let segment;
</script>

<style>
	#coverGlobal {
		position: fixed;
		top: 0;
		left: 0;

		display: none;

		z-index: 999;
	}

	#content {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#content p {
		width: 80%;
		word-break: break-word;
	}

	@media screen and (max-width: 768px) {
		#coverGlobal {
			display: block;
		}
	}

	@media (orientation: portrait) {
		#coverGlobal {
			display: block;
		}
	}

	@media (orientation: landscape) {
		#coverGlobal {
			display: none;
		}
	}
</style>

<div id="coverGlobal" class="cover has-background-primary" style="width: 100vw; height: 100vh">
	<div id="content" class="box has-background-primary" style="width: 100vw; height: 100vh">
		<p class="title is-3 has-text-white">¡Gira tu dispositivo y empieza a disfrutar del FIMPU 2020!</p>
	</div>
</div>
