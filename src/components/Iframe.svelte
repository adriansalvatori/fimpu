<script>
    export let sala
    import Player from '@vimeo/player'

    const socket = io(window.location.host)

    let iframe = sala.iframe

    socket.on('streamline', (res) => {
        if(res.room == sala.slug){
            console.log(res.message)
            iframe = res.message //Actualizamos la vista de Mensajes
            const iframe = document.querySelector('#streamline')
            const streamline = new Player(iframe)
            streamline.play()
        }
    })
</script>

<style>
    iframe {
        width: 100%;
        height: 100%;
    }
</style>

<iframe id="streamline" title="" src="{iframe}" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>