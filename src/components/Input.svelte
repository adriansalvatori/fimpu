<script>
/**
 * El componente Input está pensado para siempre 
 * despachar un evento de socket.io
 * 
 * Obtiene un objeto con el nombre del evento a despachar
*/	
export let event //El evento que emitiremos
export let room //La sala a la que emitiremos

const socket = io(window.location.host)

let message = ''
let user = localStorage.getItem('User')
const handleSubmit = () => {
    if(message!=''){
        socket.emit(event, {message:message,room:room, user:user})
        message = ''
    }
}

</script>

<div class="box is-full-width is-rounded">
    <form action="">
        <div class="columns">
            <div class="column is-10"> <input type="text" class="input" placeholder="Escribe acá" bind:value="{message}"></div>
            <div class="column is-2"><button on:click|preventDefault={handleSubmit} class="button"><span class="icon is-small"><i data-feather="send"></i></span></button></div>
        </div>
    </form>
</div>
