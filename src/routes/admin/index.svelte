<script context="module">
    import Input from "../../components/Input.svelte"
    import Messages from "../../components/Messages.svelte"
    import Agenda from "../../components/Agenda.svelte"
    import Iframe from "../../components/Iframe.svelte"
    
    import Encuestas from "../../components/Encuestas.svelte"
    import Trivias from "../../components/Trivias.svelte"
    import RoomChange from "../../components/RoomChange.svelte"

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
<script>
    /**
     * Inner stuff
     */

    export let sala

    const abrirAgenda = () => {
        document.querySelector('#agenda-interactiva').classList.toggle('is-active')
    }
</script>
<style lang="scss">
    $gradient: linear-gradient(71deg, rgba(82, 11, 217, 1) 0%, rgba(161, 0, 224, 1) 100%);

    .has-background-gradient {
        background: $gradient !important;
    }

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
    
    .hero-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>

<svelte:head>
    <title>{sala.title} - FIMPU</title>
</svelte:head>

<section id="lobby-salas" class="hero is-fullheight is-relative is-clipped is-light">

    <Agenda />
    <RoomChange room={sala.slug}  admin={false}/>
    <div class="hero-header has-padding-30">
        <div class="columns">
            <div class="column is-5"><img  style="mix-blend-mode:darken" src="logo-header.svg" alt=""></div>
            <div class="column is-3 is-offset-4">
                <button on:click={abrirAgenda} class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Agenda</span></button>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="arrow-left-circle"></i></span><span>Volver al Lobby</span></a>
            </div>
        </div>
    </div>
    <div class="hero-body">
        <div class="container">
            <div class="columns content is-small">
                <div class="column is-9">
                    <!-- Streamline Central -->
                    <div class="iframe-container box is-full-height has-border-link">
                        <Iframe {sala}/>
                    </div>
                    <Trivias room={sala.slug} admin={false}/>
                    <Encuestas room={sala.slug} admin={false}/>
                </div>
                <div class="column is-3">
                    <!-- Caja de Preguntas -->
                    <div class="questions box  has-background-gradient">
                        <div class="title is-6 has-text-white">Preguntas para el Panelista</div>
                        <!-- Componente de envío de eventos -->
                        <Input placeholder="Escribe tu pregunta aquí" room={sala.slug} event={'question'} />
                    </div>
                    <!-- Caja de Comentarios -->
                    <div class="comments card">
                        <Messages room={sala.slug} event={'message-approved'} />
                        <div class="card-footer has-background-gradient has-padding-20">
                            <!-- Componente de envío de eventos -->
                            <Input placeholder="Escribe tu comentario aquí" room={sala.slug} event={'message'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hero-footer">
        <div class="is-flex justify-content-start">
            <img class="decoration" src="decoration.svg" alt=""> 
            <a href="/lobby" id="volver" class="button has-margin-left-25px is-primary has-margin-bottom-50"><span class="icon is-small"><i
                data-feather="chevrons-left"></i></span><span>Volver al Lobby</span></a>
        </div>

        <div class="is-flex justify-content-end">
                <img src="membrete.svg" alt="">
        </div>
    </div>
</section>