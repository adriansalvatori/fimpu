<script>
    import SlideShow from "../../components/SlideShow.svelte";
    import Agenda from "../../components/Agenda.svelte"
    import {onMount} from "svelte"
    import sha1 from 'js-sha1'
    /***
     * Bigbluebutton consts
     * URL: https://fimpu.live/bigbluebutton/
     * Secret: ku5beVDaQpeNlcvQ7xtJgEC5qOxh3NxUlhFbYZ2jEos
     * 
     */
    const endpoint = 'https://fimpu.live/bigbluebutton/api/'
    const secret = 'ku5beVDaQpeNlcvQ7xtJgEC5qOxh3NxUlhFbYZ2jEos'
    
    const redirectToHelp = () => {
        var phone = '3013866322';
        var country = '57';
        var url = 'https://wa.me/' + country + phone;
        window.open(url, '_blank');
    }
    let nombre = ''

    onMount(() => {
        createRoom()
    })

    const createRoom = () => {
        let 
        method = 'create', 
        query = 'maxParticipants=50&allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&logoutURL=https://rtvc.gov.co/fimpu&meetingID=Fimpu - Líderes&moderatorPW=mp&name=Fimpu - Líderes&record=true&userdata-bbb_ask_for_feedback_on_logout=false&userdata-bbb_auto_join_audio=true&userdata-bbb_client_title=Fimpu - Líderes&userdata-bbb_custom_style_url=https://ozelproducciones.com/app-theming/fimpu.css'
        query = encodeURI(query)
        let checksum = sha1(method+query+secret)

        let url = endpoint+method+'?'+query+'&checksum='+checksum
        fetch(url)
            .then(function(response) {
                return response.text()
            })
            .then(function(data) {
                console.log('data = ', data)
            })
            .catch(function(err) {
                console.error(err)
            })
    }

    const joinRoom = (password) => {
        let 
        method = 'join', 
        query = 'fullName='+nombre+'&password='+password+'&allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&logoutURL=https://rtvc.gov.co/fimpu&meetingID=Fimpu - Líderes&moderatorPW=mp&name=Fimpu - Líderes&record=true&userdata-bbb_ask_for_feedback_on_logout=false&userdata-bbb_auto_join_audio=true&userdata-bbb_client_title=Fimpu - Líderes&userdata-bbb_custom_style_url=https://ozelproducciones.com/app-theming/fimpu.css'
        query = encodeURI(query)
        let checksum = sha1(method+query+secret)

        let url = endpoint+method+'?'+query+'&checksum='+checksum
        window.location.replace(url)
    }



    const abrirAgenda = () => {
        document.querySelector('#agenda-interactiva').classList.toggle('is-active')
    }
</script>

<style lang="scss">
    // $gradient: linear-gradient(71deg, rgba(161,0,224,1) 0%, rgba(231,60,41,1) 100%);

    .img-box {
        height: 300px;
        width: 100%;
        background-size: cover !important;
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
            <div class="column is-5"><img src="logo-header.svg" alt=""></div>
            <div class="column is-3 is-offset-4">
                <button on:click={redirectToHelp} class="button is-primary"><span><i data-feather="phone"></i></span>¿Necesitas ayuda?<span></span></button>
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
                        <h1 class="has-text-primary has-text-weight-bold">líderes</h1>
                    </div>
                </div>
                <div class="column is-7">
                    <div class="box is-hidden has-background-primary">
                        <h2 class="title is-2 has-text-white">Esta sala estará activa <br> el 25 de Noviembre</h2>
                    </div>
                    <div class="box has-background-light">
                        <input class="input" type="text" bind:value={nombre} placeholder="Ingresa tu nombre">
                        
                        <button on:click={() => {joinRoom('mp')}} class="button is-primary is-hidden">Acceder como Moderador</button> <button on:click={() => {joinRoom('ap')}} class="button is-primary">Acceder como Audiencia</button> 
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="hero-footer" style="margin-bottom: -15px">
        <div class="columns is-mobile level is-gapless">
            <div class="column is-2">
                <img src="decoration.svg" alt="">
            </div>
            <div class="column is-8 is-offset-1">
                <img class="membrete" src="membrete.svg" alt="">
            </div>
        </div>
    </div>
</div>