<script>
const socket = io('http://localhost:3000')

export let event, room, approval

let messages = []

socket.on(event, (res) => {
    if(res.room == room){
        messages.push(res.message)
        messages = messages //Actualizamos la vista de Mensajes
        updateComponent()
    }
})

const approveComment = (message, index) => {
    socket.emit('message-approved', {message:message, room:room})
    removeItem(index)
    console.log('Done')
}

const declineComment = (message, index) => {
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
                <div class="column is-9">
                    <small class="content is-small has-text-primary">Usuario equis</small><br>
                    <span>{message}</span>
                </div>
                { #if ( approval===true )}
                <div class="column is-3">
                    <button on:click={() => {approveComment(message, index)}} class="button is-primary">Aprobar</button>
                    <button on:click={() => {declineComment(message, index)}} class="button is-danger is-outlined">Eliminar</button>
                </div>
                {/if}
            </div>
        </section>
    {/each}
</div>
