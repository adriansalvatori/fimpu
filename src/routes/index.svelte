<style lang="scss">
	#login {
		.is-overlay {
			background-position: bottom !important;
			filter: blur(8px);
			-webkit-filter: blur(8px);
		}
	}

	#coverGlobal {
		position: fixed;
		top: 0;
		left: 0;

		display: block;

		z-index: 999;
	}

	#content {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#content .pronto {
		width: 80%;
		white-space: pre-line;
	}
</style>

<script>

	var timerRev = '';
	var end = new Date('Noviembre 26, 2020 07:00:00');

	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;
	var timer;

	function showRemaning() {
		var now = new Date();
		var distance = end - now;

		if (distance < 0) {
				clearInterval(timer);
		} else {
			var days = Math.floor(distance / _day);
			var hours = Math.floor((distance % _day) / _hour);
			var minutes = Math.floor((distance % _hour) / _minute);
			var seconds = Math.floor((distance % _minute) / _second);

			timerRev = `En ${hours > 9 ? hours : '0' + hours}H:${minutes > 9 ? minutes : '0' + minutes}M:${seconds > 9 ? seconds : '0' + seconds}S estaremos al aire`;
		}
	}

	timer = setInterval(showRemaning, 1000);

	/* ================================================================== */


	import { goto } from '@sapper/app' //Redirecter

	const preload = () => { //Toggle Preloader
		document.querySelector('#preloader').classList.toggle('is-active') 
	}

	const loginTrigger = (e) => { //Trigger Login
		e.preventDefault()
		preload() //Trigger Preloader
		const user = document.querySelector('#email').value
		const password = document.querySelector('#password').value
		console.log(user,password)
		localStorage.setItem('User', user)
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


<div id="coverGlobal" class="cover has-background-primary" style="width: 100vw; height: 100vh">
	<div id="content" class="box has-background-primary" style="width: 100vw; height: 100vh; display: flex; flex-flow: column;">
		<div class="box">
			<img src="logo.svg" class="has-margin-top-20" alt="">
		</div>
		<p class="title is-2 has-text-white pronto" style="margin: 10px auto;">Pronto comenzará el FIMPU 2020</p>
		<p id="counter" class="title is-4 has-text-white pronto" style="margin: 10px auto">{timerRev}</p>
	</div>
</div>

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
									<input id="password" required type="number" placeholder="Su número telefónico" class="input is-rounded">
								</div>
								<div class="field">
									<label class="checkbox">
										<input required type="checkbox">
										Acepto los <a href="/terms" class="link">Términos y Condiciones</a>
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