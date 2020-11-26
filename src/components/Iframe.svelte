<script>
    export let sala
    import Player from '@vimeo/player'

    const socket = io(window.location.host)
    let translation = false //trigger del modo multilenguaje

    /*iframe por defecto*/
    let iframe = sala.iframe
    let iframet = ''

    /** Players por defecto*/
    let streamline, streamlinet




    socket.on('streamline', (res) => {
        if(res.room == sala.slug){
            iframe = res.message //Actualizamos la vista de Streamline
            setTimeout(() => {
                streamline = new Player(document.querySelector('#streamline'))
                console.log(streamline)
                streamline.play()
            },2000)
        }
    })

    socket.on('streamline-traducido', (res) => {
        if(res.room == sala.slug){
            translation = true //Avisamos que tenemos traducción
            //https://player.vimeo.com/video/482910352
            iframet = res.message //Actualizamos la vista de Streamline
            setTimeout(() => {
                streamline = new Player(document.querySelector('#streamline'))
                streamlinet = new Player(document.querySelector('#streamline-traducido'))
                console.log(streamlinet)
            },2000)
        }
    })

    let streamOriginal = () => {

        document.querySelector('#streamline').classList.remove('is-hidden')
        document.querySelector('#streamline-traducido').classList.add('is-hidden')


        console.log(streamline, streamlinet)
        streamline.play()
        streamlinet.pause()
    }

    let streamTraducido = () => {

        document.querySelector('#streamline-traducido').classList.remove('is-hidden')
        document.querySelector('#streamline').classList.add('is-hidden')

        console.log(streamline, streamlinet)
        streamline.pause()
        streamlinet.play()
    }
</script>

<style>
    iframe {
        width: 100%;
        height: 100%;
    }
</style>

{#if (translation) }

<div class="controls has-margin-bottom-30" style="margin-top: -60px;">
    <div class="field has-addons">
        <div class="control">
            <div on:click={streamOriginal} class="button is-small is-primary is-outlined">Ver en Audio Original</div>
        </div>
        <div class="control">
            <div on:click={streamTraducido} class="button is-small is-primary is-outlined">Ver en Audio Traducido</div>
        </div>
    </div>
</div>

<iframe class="is-hidden" id="streamline-traducido" title="" src="{iframet}" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

{/if}

<iframe id="streamline" title="" src="{iframe}" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

