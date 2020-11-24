<script context="module">
    import Input from "../../../components/Input.svelte"
    import Messages from "../../../components/Messages.svelte"
    import Agenda from "../../../components/Agenda.svelte"
    import Iframe from "../../../components/Iframe.svelte"
    import Encuestas from "../../../components/Encuestas.svelte"
    import Trivias from "../../../components/Trivias.svelte"
    import RoomChange from "../../../components/RoomChange.svelte"

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
    $gradient: linear-gradient(71deg, rgba(161, 0, 224, 1) 0%, rgba(82, 11, 217, 1) 100%);

    .has-background-gradient {
        background: $gradient !important;
    }

    .logo {
        mix-blend-mode: multiply;
    }
</style>

<svelte:head>
    <title>{sala.title} - FIMPU</title>
</svelte:head>

<section id="lobby-salas" class="hero is-fullheight is-light is-relative is-clipped">

    <Agenda />

    <div class="hero-header has-padding-30">
        <div class="columns">
            <div class="column is-5"><a href="/"><img class="logo" src="logo-salas.svg" alt=""></a></div>
            <div class="column is-3 is-offset-4">
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i
                            data-feather="user"></i></span><span>Perfil</span></a>
                <button on:click={abrirAgenda} class="button is-primary is-small is-outlined"><span
                        class="icon is-small"><i data-feather="user"></i></span><span>Agenda</span></button>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i
                            data-feather="user"></i></span><span>Configuración</span></a>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i
                            data-feather="user"></i></span><span>Ayuda</span></a>
            </div>
        </div>
    </div>
    <div class="hero-body">
        <div class="container">
            <h2 class="title is-2">Espacio de Administración para {sala.title}</h2>
            <div class="columns">
                <div class="column is-3"><RoomChange room={sala.slug} admin={true}/></div>
                <div class="column is-3"><Trivias room={sala.slug} admin={true}/></div>
                <div class="column is-3"><Encuestas room={sala.slug} admin={true}/></div>
            </div>
            <div class="columns">
                <div class="column is-4">
                    <!-- Streamline Central -->
                    <div class="iframe-container box">
                        <Input room={sala.slug} event={'streamline'} />
                        <Iframe {sala}/>
                    </div>
                </div>
                <div class="column is-4">
                     <!-- Caja de Preguntas -->
                     <div class="comments card">
                        <Messages room={sala.slug} event={'question'} />
                        <div class="card-footer has-background-gradient has-padding-20">
                            <!-- Componente de envío de eventos -->
                            <Input room={sala.slug} event={'question'} />
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <!-- Caja de Comentarios -->
                    <div class="comments card">
                        <Messages approval={true} room={sala.slug} event={'message'} />
                        <div class="card-footer has-background-gradient has-padding-20">
                            <!-- Componente de envío de eventos -->
                            <Input room={sala.slug} event={'message-approved'} />
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