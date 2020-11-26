<script>
/**
 * El componente Input está pensado para siempre 
 * despachar un evento de socket.io
 * 
 * Obtiene un objeto con el nombre del evento a despachar
*/	
export let event, room, placeholder 

if(placeholder === '') placeholder = "Escribe acá"

const socket = io(window.location.host)

let message = ''

let user = JSON.stringify(localStorage.getItem('User'))



const handleSubmit = () => {
    if(message!=''){
        socket.emit(event, {message:message,room:room, user:user})
        message = ''
    }
}

socket.emit('new-user', JSON.parse(localStorage.getItem('user')))

</script>

<style>
    .button.is-circle {
        border-radius: 321654px;
        border-bottom-left-radius: 321654px !important;
        border-top-left-radius: 321654px !important;
        margin-left: -50%;
        z-index: 10 !important;
    }
</style>

<form class="form is-full-width" action="">
    <div class="field has-addons">
        <div class="control is-expanded"><input type="text" class="input is-small is-rounded" placeholder="{placeholder}" bind:value="{message}"></div>
        <div class="control">
            <div class="item">
                <button on:click|preventDefault={handleSubmit} class="button is-link is-small is-circle"><span class="icon is-small"><i data-feather="send"></i></span></button>
            </div>
        </div>
    </div>
</form>
