<script>
    import SlideShow from "./SlideShow.svelte"
    export let stand
    
    let images = stand.gallery
    const openGallery = () => {
        document.querySelector('#galeria-interactiva').classList.toggle('is-active')
    }
</script>

<style lang="scss">
    .iframe-container {
        $measure: 55vh;
        width: $measure;
        height: $measure;
        position: absolute;
        top: 60%;
        left: 47%;
        transform: translate(-50%, -50%);

        iframe {
            width: 100%;
            height: 56%;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 0 60px rgba(0, 0, 0, 0.3);
        }
    }

    .controls .button {
        background: white;
        font-weight: bold;

        &.is-primary.is-outlined {
            position: absolute;
            font-size: 1.8vh;

            &.has-iframe {
                top: -8vh;
                right:0;
            }

            &.has-gallery {
                bottom: 30vh;
                left: 15vw;
            }

            &.has-pdf {
                bottom: 30vh;
                right: 15vw;
            }
        }
    }
</style>

<div class="controls">
    <!-- Video -- Conócenos -->
    <div class="iframe-container">
        <button class="button is-rounded is-primary is-outlined is-uppercase has-iframe">Conócenos</button>
        <iframe title="{stand.title}" src="{stand.iframe}" frameborder="0" allow="autoplay; fullscreen"
            allowfullscreen></iframe>
    </div>

    <!-- Galería -->

    <div class="gallery-trigger">
        <button on:click={openGallery} class="button is-rounded is-primary is-outlined is-uppercase has-gallery">Galería</button>
    </div>
    <SlideShow {images}/>

    <!-- PDF -- Sobre Nosotros -->
    {#if stand.pdf}
    <div class="pdf-trigger">
        <a target="_blank" href={stand.pdf} class="button is-rounded is-primary is-outlined is-uppercase has-pdf">Sobre Nosotros</a>
    </div>
    {/if}
</div>
