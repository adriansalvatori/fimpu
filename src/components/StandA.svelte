<script>
    import SlideShow from "./SlideShow.svelte"
    import StandChat from "./StandChat.svelte"
    export let stand
    
    let images = stand.gallery
    const openGallery = () => {
        document.querySelector('#galeria-interactiva').classList.toggle('is-active')
    }
    const openModal = () => {
        document.querySelector('#standchat').classList.toggle('is-active')
    }
</script>

<style lang="scss">
    .iframe-container {
        $measure: 55vh;
        width: $measure;
        height: $measure;
        position: absolute;
        top: 55%;
        left: 70%;
        transform: translate(-50%, -50%);

        iframe {
            width: 100%;
            height: 56%;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 0 60px rgba(0, 0, 0, 0.3);
            background: black;
        }
    }

    .controls .button {
        font-weight: bold;

        &.is-primary {
            position: absolute;
            font-size: 1.8vh;

            &.has-iframe {
                top: -8vh;
                right:0;
            }

            &.has-gallery {
                bottom: 32vh;
                left: 16.5vw;
            }

            &.has-chat {
                bottom: 30vh;
                right: 15vw;
            }

            &.has-pdf {
                top: 25vh;
                right: 45vw;
            }
        }
    }

    .gallery-trigger {
        perspective: 1000px;
        height: 33vh;
        width: 22vh;
        position: absolute;
        left: 13vw;
        bottom: 18vh;
        mix-blend-mode: multiply;

        .imagen-inicial {
            height: 92%;
            position: relative;
            top: 5%;
            left: 1.7%;
            width: 83%;
            transform: rotate3d(0, 1, 0.08, 21deg);
            cursor: pointer
        }
    }

    #btnGaleria {
        position: absolute;
        bottom: 150px;
        left: 15%;
    }
</style>

<div class="controls">
    <!-- Video -- Conócenos -->
    {#if stand.iframe}
    <div class="iframe-container">
        <a href="{stand.website}" target="_blank" class="button is-rounded is-primary is-uppercase has-iframe">Conócenos</a>
        <iframe title="{stand.title}" src="{stand.iframe}" frameborder="0" allow="autoplay; fullscreen"
            allowfullscreen></iframe> 
    </div>
    {/if}
    <!-- Galería -->
    {#if stand.gallery}
    <a id="btnGaleria" on:click={openGallery} class="button is-rounded is-primary is-uppercase">Galería</a>
    <div class="gallery-trigger">
        <div class="imagen-inicial" on:click={openGallery}></div>
    </div>
    <SlideShow {images}/>
    {/if}
    <!-- PDF -- Sobre Nosotros -->
    {#if stand.pdf}
    <div class="pdf-trigger">
        <a target="_blank" href={stand.pdf} class="button is-rounded is-primary is-uppercase has-pdf">Sobre Nosotros</a>
    </div>
    {/if}
    <!-- PDF -- Chat Modal -->
    {#if stand.chat}
    <div class="chat-trigger">
        <StandChat/>
        <a on:click={openModal} class="button is-rounded is-primary is-uppercase has-chat">Punto de Contacto</a>
    </div>
    {/if}
</div>
