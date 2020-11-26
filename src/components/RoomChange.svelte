<script>
    /**
     * Este componente está pensado para enviar al usuario a otras salas
     * u otras áreas del evento en cierto punto.
     * 
     * 1: Un trigger para el administrador que abre una modal con el formulario de opciones
     * 2: Un evento de Socket que se emite al server, con el objeto de opciones y el slug de la sala. 
     * 3: Un evento de Socket que se emite desde el server a su sala homóloga
     * 4: Un segundo modal que se muestra en la sala homóloga para redirigir según las opciones. se
     */

    const socket = io(window.location.host)

    export let room, admin

    const toggleAdminModal = () => {
        document.querySelector('#set-changes').classList.toggle('is-active')
    }

    const toggleClientModal = () => {
        document.querySelector('#get-changes').classList.toggle('is-active')
    }

    /**
     * Manejando Opciones - Admin
    */

    let changes = [], text = '', url = ''

    const addOptions = (e) => {
        e.preventDefault()
        if(text!='' && url!=''){
            changes.push({text:text, url:url})
            changes = changes //Used to update svelte #each blocks
            text=''
            url=''
        }
    }

    const emitOptions = () => {
        socket.emit('room-change', {changes:changes, room:room} )
        alert('Sus usuarios ahora están viendo las nuevas opciones.')
    }

    /**
     * Manejando Opciones - Cliente
    */

    let clientChanges = []

    socket.on('room-change', (res) => {
        console.log(res)
        console.log("Room:" + room)
        if (res.room === room) {
            clientChanges = res.changes
            clientChanges = clientChanges //Updating Svelte #each blocks
            console.log(clientChanges)
            toggleClientModal()
        }
    })


</script>

<!-- Modal de Opciones en el Admin -->
{#if (admin)}
<button on:click={toggleAdminModal} class="button is-primary">Emitir Opciones de Sala</button>

<div id="set-changes" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="card">
            <div class="card-content">
                <h4 class="title is-4">¿A qué salas pueden dirigirse los usuarios?</h4>
                {#each changes as item}
                    <section class="notification is-primary">
                        <a href="{item.url}">{item.text}</a>
                    </section>
                {/each}
            </div>
            <div class="card-footer">
                <div class="card-footer-item">
                    <form on:submit={addOptions} class="form">
                        <div class="field has-addons">
                            <div class="control is-expanded">
                                <input type="text" placeholder="Texto" bind:value={text} class="input">
                            </div>
                            <div class="control">
                                <input type="text" placeholder="URL" bind:value={url} class="input">
                            </div>
                            <div class="control">
                                <button  class="button is-primary">Agregar Opción</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-footer-item">
                    <button on:click={toggleAdminModal} class="button is-danger is-outlined">Cancelar</button>
                </div>
                <div class="card-footer-item">
                    <button on:click={emitOptions} class="button is-primary">Emitir Opciones</button>
                </div>
            </div>
        </div>
    </div>
    <button on:click={toggleAdminModal} class="modal-close is-large" aria-label="close"></button>
</div>

{/if}

<!-- Modal de opciones en la sala Homóloga -->


<div id="get-changes" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="box has-background-link has-text-centered">
            <h2 class="title is-2 has-text-white">¿Qué quieres hacer ahora?</h2>
            {#each clientChanges as item}
                <section class="section">
                    <a on:click={toggleClientModal} class="button is-primary is-inverted is-rounded" href="{item.url}">{item.text}</a>
                </section>
            {/each}
        </div>
    </div>
    <button on:click={toggleClientModal} class="modal-close is-large" aria-label="close"></button>
</div>
