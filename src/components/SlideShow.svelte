<script>
    import {
        onMount
    } from 'svelte'

    export let images

    const closeGallery = () => {
        document.querySelector('#galeria-interactiva').classList.toggle('is-active')
    }

    onMount(async () => {
        let {
            tns
        } = await import("tiny-slider/src/tiny-slider")
        let slider = tns({
            nav:false,
            controls:false,
            container: '.gallery',
            items: 1,
            slideBy: 'page',
            autoplay: false,
            mouseDrag: true,
        })

        let next = document.querySelector('.goes-next'), prev = document.querySelector('.goes-prev')

        next.addEventListener('click', () => {
            slider.goTo('prev')
        })
        prev.addEventListener('click', () => {
            slider.goTo('next')
        })
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

    .controls-container {
        position: fixed;
        transform: translateX(-50%);
        left: 50%;
        top: 50%;
        z-index: 9999;
        width: 90vw;
        display: flex;
        justify-content: space-between;
    }
</style>

<div id="galeria-interactiva" class="modal">
    <div on:click={closeGallery} class="modal-background"></div>
    <div class="modal-content">
        <div class="container">
            <div class="controls-container">
                <div class="button is-light goes-next"><span class="icon"><i data-feather="arrow-left-circle"></i></span></div>
                <div class="button is-light goes-prev"><span class="icon"><i data-feather="arrow-right-circle"></i></span></div>
            </div>
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