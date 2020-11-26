<script>
const socket = io(window.location.host)

export let event, room, approval

let messages = []

socket.on(event, (res) => {
    if(res.room == room){
        messages.push({message:res.message, user: res.user})
        messages = messages //Actualizamos la vista de Mensajes
        updateComponent()
    }
})

const approveComment = (message, index, user) => {
    socket.emit('message-approved', {message:message, room:room, user:user})
    removeItem(index)
    console.log('Done')
}

const declineComment = (index) => {
    removeItem(index)
    console.log('Done')
}

const removeItem = (index) => {
    if (index > -1) {
        messages.splice(index, 1);
    }
    messages = messages //Actualizamos la vista de Mensajes
    updateComponent()
}

const updateComponent = () => {
    const box = document.querySelector('.card-content')
    box.scrollTop = box.scrollHeight //Hacemos Scroll al final de la caja
}

</script>

<style lang="scss">
    .card-content {
		height: 30vh;
        overflow: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>

<div class="card-content has-background-primary-light">
    {#each messages as message, index}
        <section id="message{index}" class="notification message is-white">
            <div class="columns">
                <div class="content is-small column is-9">
                    <small class="has-text-primary">{message.user}</small><br>
                    <span>{message.message}</span>
                </div>
                { #if ( approval===true )}
                <div class="column is-3">
                    <button on:click={() => {approveComment(message.message, index, message.user)}} class="button is-small is-primary">Aprobar</button>
                    <button on:click={() => {declineComment(index)}} class="button is-small is-danger is-outlined">Eliminar</button>
                </div>
                {/if}
            </div>
        </section>
    {/each}
</div>
