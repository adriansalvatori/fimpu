<script>
    import SlideShow from "../components/SlideShow.svelte";
    import Agenda from "../components/Agenda.svelte"

    const images = [
        'FIMPU2019_1.jpg',
        'FIMPU2019_2.jpg',
        'FIMPU2019_4.jpg',
        'FIMPU2019_5.jpg',
        'FIMPU2019_7.jpg',
        'FIMPU2019_11.jpg',
        'FIMPU2019_3.jpg',
        'FIMPU2019_6.jpg',
        'FIMPU2019_8.jpg',
        'FIMPU2019_9.jpg',
        'FIMPU2019_10.jpg',
        'FIMPU2019_12.jpg',
    ];

    const abrirAgenda = () => {
        document.querySelector('#agenda-interactiva').classList.toggle('is-active')
    }
</script>

<style lang="scss">
    // $gradient: linear-gradient(71deg, rgba(161,0,224,1) 0%, rgba(231,60,41,1) 100%);

    .img-box {
        height: 300px;
        width: 100%;
        background-size:cover !important; 
    }

    .hero-body {
        width: 100%;
    }

    .hero-body h1 {
        font-size: 8vh;
    }

    #imageContainer {
        max-height: 70vh;
        overflow-y: scroll;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            display: none;
        }
    }

</style>

<div id="lobby-salas" class="hero is-fullheight is-relative0 is-clipped">
    <div class="hero-header has-padding-30">
        <div class="columns">
            <div class="column is-5"><img src="logo-salas.svg" alt=""></div>
            <div class="column is-3 is-offset-4">
                <a on:click={abrirAgenda} class="button is-primary is-small is-outlined"><span class="icon is-small"><i
                            data-feather="user"></i></span><span>Agenda</span></a>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i
                            data-feather="user"></i></span><span>Volver</span></a>
            </div>
        </div>
    </div>

    <Agenda />

    <div class="hero-body">
        <div class="container">
            <div class="columns level">
                <div class="column is-5">
                    <div class="logoFimpu">
                        <img src="logo.svg" alt="">
                        <h1 class="has-text-primary has-text-weight-bold">MEMORIAS <br> 2019</h1>
                    </div>
                </div>
                <div id="imageContainer" class="column is-7">
                    <div class="columns is-multiline">
                        {#each images as image, i}
                            <div class="column is-half">
                                <div class="img-box box" style="background:url({images[i]})"></div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hero-footer">
        <img class="decoration" src="decoration.svg" alt="" style="position: fixed; bottom: 0; left: 0">
    </div>
</div>