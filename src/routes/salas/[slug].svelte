<script context="module">
	import Input from "../../components/Input.svelte"
	import Messages from "../../components/Messages.svelte"
    import Agenda from "../../components/Agenda.svelte"

	export async function preload({
		params,
		query
	}) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`salas/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return {
				sala: data
			};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<style lang="scss">
    iframe {
        width: 100%;
        height: 50vh;
    }

	$gradient: linear-gradient(71deg, rgba(161,0,224,1) 0%, rgba(82,11,217,1) 100%);
	.has-background-gradient {
		background: $gradient !important;
	}
	.card-content {
		height: 30vh;
	}
</style>

<script>
	export let sala;
	    
    const abrirAgenda = () => {
        document.querySelector('#agenda-interactiva').classList.toggle('is-active')
    }
</script>

<svelte:head>
	<title>{sala.title} - FIMPU</title>
</svelte:head>

<section id="lobby-salas" class="hero is-fullheight is-relative0 is-clipped">

	<Agenda/>

    <div class="hero-header has-padding-30">
        <div class="columns">
            <div class="column is-5"><img src="logo-salas.svg" alt=""></div>
            <div class="column is-3 is-offset-4">
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Perfil</span></a>
                <button on:click={abrirAgenda} class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Agenda</span></button>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Configuración</span></a>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Ayuda</span></a>
            </div>
        </div>
    </div>
	<div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <!-- Streamline Central -->
                    <div class="iframe-container box">
                        <iframe title="" src="{sala.iframe}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="column is-4">
                    <!-- Caja de Preguntas -->
                    <div class="questions box  has-background-gradient">
                        <div class="title is-4 has-text-white">Preguntas para el Panelísta</div>
						<!-- Componente de envío de eventos -->
						<Input />
                    </div>
                    <!-- Caja de Comentarios -->
                    <div class="comments card">
                        <div class="card-content has-background-primary-light">
							<Messages />
						</div>
                        <div class="card-footer has-background-gradient has-padding-20">
							 <!-- Componente de envío de eventos -->
								<Input />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hero-footer">
        <img class="decoration" src="decoration.svg" alt="">
    </div>
</section>