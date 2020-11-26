<style lang="scss">
	#login {
		.is-overlay {
			background-position: bottom !important;
			filter: blur(8px);
			-webkit-filter: blur(8px);
		}
	}

	#counterClock {
		z-index: 99999;
	}
</style>

<script>
	import { goto } from '@sapper/app' //Redirecter

	const preload = () => { //Toggle Preloader
		document.querySelector('#preloader').classList.toggle('is-active') 
	}

	const loginTrigger = (e) => { //Trigger Login
		e.preventDefault()
		preload() //Trigger Preloader
		let user = document.querySelector('#email').value
		let tlf = document.querySelector('#tlf').value

		fetch('http://149.28.104.43:3000/users/adriansalvatori@gmail.com', {
			headers: {
				'Authorization': 'ed607a90e24ddb6a722babf5e21edc67', 'Content-Type': 'text/plain',
			}
		})
			.then(function(response) {
				return response.text();
			})
			.then(function(data) {
				user = data
				localStorage.setItem('user', user)
				console.log(localStorage.getItem('user'))
			})
			.catch(function(err) {
				console.error(err)
				if(err) user = {user:user, tlf: tlf}
			})

		/**
		 * Here we Await for the Api to validate
		*/
		setTimeout(() => {
			goto('/lobby') //Redirect
			preload() //Trigger Preloader
		}, 1000);
	}

	let register = () => {
		window.location.replace('https://www.rtvc.gov.co/fimpu#block-webform-client-block-14596');
	}

	console.log('Actualización: v3-1822 -- DEV')
</script>

<svelte:head>
	<title>FIMPU 2020</title>
</svelte:head>

<div id="login" class="hero is-fullheight is-relative is-clipped">
	<div class="is-overlay">
		<div class="hero is-fullheight" style="background: url('lobby.jpg');"></div>
	</div>
	<div class="hero-body">
		<div class="container">
			<div class="columns">
				<div class="column is-5">
					<div class="card box">
						<div class="card-content has-text-centered">
							<img src="logo-header.svg" class="has-margin-bottom-20" alt="Logo FIMPU">
							<form on:submit={loginTrigger} action="" class="form">
								<div class="field">
									<input id="email" required type="email" placeholder="Su correo electrónico" class="input is-rounded">
								</div>
								<div class="field">
									<input id="tlf" required type="number" placeholder="Su número telefónico" class="input is-rounded">
								</div>
								<div class="field">
									<label class="checkbox">
										<input required type="checkbox">
										Acepto la <a href="https://www.rtvc.gov.co/politicas-de-privacidad" target="_blank" class="link">política de privacidad de datos
											</a>
									</label>
									<label class="checkbox">
										<input required type="checkbox">
										Acepto el <a href="https://www.rtvc.gov.co/politicas-de-privacidad" target="_blank" class="link">tratamiento de datos</a>
									</label>
								</div>
								<div class="field">
									<button type="submit" class="button is-primary is-rounded is-outlined">
										<span><i data-feather="user"></i></span>
										<span>Entrar Ahora</span>
									</button>
									<button type="submit" class="button is-primary is-rounded is-outlined">
										<span><i data-feather="user"></i></span>
										<span on:click="{register}">Registrarse</span>
									</button>
								</div>
							</form>
							<img src="membrete.svg" class="has-margin-top-20" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>