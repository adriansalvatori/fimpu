<script>
    import {onMount} from 'svelte'
   
    export let images

    const closeGallery = () => {
        document.querySelector('#galeria-interactiva').classList.toggle('is-active')
    }

    onMount( async () => {
        let { tns } = await import("tiny-slider/src/tiny-slider") 
        let slider = tns({ container: '.gallery', items: 1, slideBy: 'page', autoplay: false, mouseDrag: true})
    })
</script>

<style lang="scss">
    .modal-content {
        width: 90vw;
        height: 90vh;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
</style>

<div id="galeria-interactiva" class="modal">
    <div on:click={closeGallery} class="modal-background"></div>
    <div class="modal-content">
        <div class="container">
            <div class="gallery columns">
                {#each images as image}
                    <div class="item column is-12">
                        <img src="{image}" alt="{image}">
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <button on:click={closeGallery} class="modal-close is-large" aria-label="close"></button>
</div>