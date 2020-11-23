<style lang="scss">

	#lobby {
        background-position: bottom !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
    }

    .hover-glow{
        transition: ease-out 0.4s;
        &:hover {
            filter: drop-shadow(0 0 15px #530BDB)
        }
    }
    
    $screen-width: 55vh; //The screen width is used to calculate the iframe aspect ratio

	.screen-container {
		position: absolute;
		left: 17%;
		top: -18vh;
        width: $screen-width;

        img {
            width: $screen-width;
        }

        .screen-content {
            position: absolute;
            bottom: 0;
            width: $screen-width;
            height: $screen-width;
            display:flex;
            align-items: flex-end;
            padding: 2.65vh;
            iframe {
                width: 100% !important;
                height: 60.25% !important; //Locking aspect ratio as 16:9
                background: #00121f;
            }
        }
	}

	.menu-container {
		position: absolute;
		left: 7%;
		bottom: -5vh;
        width: 30vh;
        perspective: 1000px;
        perspective-origin: 50% 38%;

        img {
            width: 30vh;
        }
        
        .menu-content {
            position: absolute; 
            top: 50%;
            left: 50%;
            max-width: 100%;
            transform: translate(-43%, -69%) scale(0.7) rotate3d(0, 1, 0, 18deg);

            .button {
                font-size: 1.8vh;
                white-space: unset;
                height: auto;
                width: 22vh;
                justify-content: space-between;
                text-align: right;
                margin-bottom: 1vh;
                //flex-direction: column;
            }
            .title {
                font-size: 2.6vh;
            }
        }
	}

	.pedestal-container {
		position: absolute;
		right: 10%;
		bottom: -5vh;
		max-width: 30vh;
		transform: translateY(45%)
    }
    .button.is-control {
        position: absolute;
        background: white;

        &.stands {
            left: 22%;
            transform: translateY(-5vh);
        }
        &.auditorio1{
            right: 12%;
            transform: translateY(-10vh);
        }
        &.auditorio2{
            left: 54%;
            transform: translate(-15vh, -5vh);
        }
        &.auditorio3{
            left: 40%;
            transform: translate(-15vh, 2vh);
        }
        
    }
</style>

<script>
    import Agenda from '../components/Agenda.svelte'
    
    const abrirAgenda = () => {
        document.querySelector('#agenda-interactiva').classList.toggle('is-active')
    }
</script>

<svelte:head>
	<title>FIMPU 2020</title>
</svelte:head>



<div id="lobby" style="background: url('lobby.jpg');" class="hero is-fullheight is-relative is-primary is-clipped">
	<div class="hero-body">
		<!-- Pantalla -->
		<div class="screen-container hover-glow">
            <img src="screen.png" alt="">
            <div class="screen-content">
                <iframe title="streamline" width="1280" height="720" src="https://player.vimeo.com/video/481770682" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
		</div>
		<!-- Info -->
		<div class="pedestal-container hover-glow">
			<img src="pedestal.png" alt="">
		</div>
		<!-- Menú -->
		<div class="menu-container hover-glow">
            <img src="menu.png" alt="">
            <div class="menu-content has-text-centered">
                <h3 class="title is-3 has-text-primary">Bienvenidos</h3>
                <button on:click={abrirAgenda} class="button has-text-weight-bold is-primary is-outlined is-uppercase"><span class="icon is-small"><i data-feather="calendar"></i></span><span>Agenda</span></button>
                <a href="/salas/auditorio" class="button has-text-weight-bold is-primary is-outlined is-uppercase"><span class="icon is-small"><i data-feather="users"></i></span><span>Auditorio Principal</span></a>
                <a href="/memorias/2019" class="button has-text-weight-bold is-primary is-outlined is-uppercase"><span class="icon is-small"><i data-feather="users"></i></span><span>Memorias 2019</span></a>
                <a href="/memorias/2020" class="button has-text-weight-bold is-primary is-outlined is-uppercase"><span class="icon is-small"><i data-feather="users"></i></span><span>Memorias 2020</span></a>
                <a href="/medios" class="button has-text-weight-bold is-primary is-outlined is-uppercase"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Salón de Medios Públicos</span></a>
            </div>
        </div>
        <div class="controls-container">
            <a href="/medios" class="button is-rounded is-small is-primary is-outlined is-uppercase has-text-weight-bold is-control stands"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Salón de Medios Públicos</span></a>
            <a href="/salas/auditorio" class="button is-rounded is-small is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio1"><span class="icon is-small"><i data-feather="users"></i></span><span>Auditorio Principal</span></a>
            <a href="/salas/1" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio2"><span class="icon is-small"><i data-feather="users"></i></span><span>Sala 1</span></a>
            <a href="/salas/2" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio3"><span class="icon is-small"><i data-feather="users"></i></span><span>Sala 2</span></a>
        </div>
    </div>
    <Agenda/>
</div>

