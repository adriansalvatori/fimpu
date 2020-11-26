<script>
    /**
     * Este componente está pensado para obtener opciones y enviarlas
     * en forma de encuesta, para despues obtener los resultados y renderizarlos en una gráfica
     * 
     * 1: Un trigger para el administrador que abre una modal con el formulario de opciones
     * 2: Un evento de Socket que se emite al server, con el objeto de opciones y el slug de la sala. 
     * 3: Un evento de Socket que se emite desde el server a su sala homóloga
     * 4: Un segundo modal que se muestra en la sala homóloga para redirigir según las opciones. se
     */
    import Chart from "./Chart.svelte"
    const socket = io(window.location.host)

    export let room, admin

    const toggleAdminModal = () => {
        document.querySelector('#set-options').classList.toggle('is-active')
    }

    const toggleClientModal = () => {
        document.querySelector('#get-options').classList.toggle('is-hidden')
    }


    /**
     * Estado inicial
     */
    let labels = [],
        data = [],
        text = '',
        time = 60,
        title = '',
        options = {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Votos',
                data: data,
            }]
        }

    

    /**
     * Manejando Encuestas : Admin
     */
    const addOptions = (e) => {
        e.preventDefault()
        if (text != '') {
            labels.push(text)
            data.push(0)
            options = options //Used to update svelte #each blocks
            text = ''
        }
    }

    const emitOptions = () => {
        socket.emit('poll', {
            title: title,
            time: time,
            labels: labels,
            data: data,
            room: room
        })
    }

    const stackOptions = () => {

    }

    const stopOptions = () => {
        socket.emit('stop-poll', room)
        if(admin){
            toggleAdminModal()
        }  
    }

    socket.on('stop-poll', (pollroom) => {
        if(pollroom === room) {
            labels = [],
            data = [],
            text = '',
            title = '',
            options = {
                labels: labels,
                datasets: [{
                    label: 'Cantidad de Votos',
                    data: data,
                }]
            }
            toggleClientModal()
        }
    })

    /**
     * Manejando encuestas : Client
     */

     let clock

    socket.on('poll-running', (poll) => {
        if (poll.room === room) {
            console.log(poll)
            labels = poll.labels
            data = poll.data
            time = poll.time
            title = poll.title
            options = {
                labels: labels,
                datasets: [{
                    label: 'Cantidad de Votos',
                    data: data,
                }]
            }
            console.log(options)
            toggleClientModal()
            setInterval(() => {
                
            }, 1000);
            Timer(time)
        }
    })

    const Timer = (time) => {
        let ms = time * 1000
        const interval = setInterval(() => {
            time = time - 1
            clock = time
        }, 1000)

        setTimeout(() => {
            clearInterval(interval)
            clock = 0
            document.querySelector('.client-options-container').classList.add('is-hidden')
            document.querySelector('.client-chart-container').classList.remove('is-hidden')
        }, ms);
    }
 
    const Vote = (index) => {
        socket.emit('poll-vote', ({
            index: index,
            title: title
        }))
        document.querySelector('.client-options-container').classList.toggle('is-hidden')
        document.querySelector('.client-chart-container').classList.toggle('is-hidden')
    }

    socket.on('poll-update-chart', (poll) => {
        console.log(poll)
        labels = poll.labels
        data = poll.data
        title = poll.title
        options = {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Votos',
                data: data,
            }]
        }
    })
</script>

<!-- Modal de Opciones en el Admin -->
{#if (admin)}
<button on:click={toggleAdminModal} class="button is-primary">Emitir Encuesta en la Sala</button>

<div id="set-options" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="card">
            <Chart {options} />
            <div class="card-content">
                <h4 class="title is-6">Título de la Encuesta</h4>
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input type="text" placeholder="Insertar título de la encuesta" bind:value={title} class="input">
                    </div>
                    <div class="control">
                        <input type="number" placeholder="Texto" bind:value={time} class="input">
                    </div>
                    <div class="control">
                        <button  class="button is-static">segundos</button>
                    </div>
                </div>
                {#each options.labels as item}
                    <section class="button is-light">
                        {item}
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
                                <button  class="button is-primary">Agregar Opción</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-footer-item">
                    <button on:click={toggleAdminModal} class="button is-small is-danger is-outlined">Cancelar</button>
                </div>
                <div class="card-footer-item">
                    <button on:click={stopOptions} class="button is-small is-primary">Detener Encuesta</button>
                </div>
                <div class="card-footer-item">
                    <div class="field has-addons">
                        <div class="control">
                            <button on:click={stackOptions} class="button is-small is-primary is-outlined">Agregar a la lista</button>
                        </div>
                        <div class="control">
                            <button on:click={emitOptions} class="button is-small is-primary">Emitir Encuesta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button on:click={toggleAdminModal} class="modal-close is-large" aria-label="close"></button>
</div>

{:else}

<!-- Modal de opciones en la sala Homóloga -->


<div id="get-options" class="column is-5 is-offset-6 is-hidden">
    <div class="box content is-small has-background-primary has-text-centered">
    <h2 class="title is-4 has-text-white">{title}</h2>
        <div class="client-chart-container is-hidden">
            <Chart {options}/>
        </div>
        <div class="client-options-container">
            <div class="columns is-multiline">
                {#each options.labels as item, index}
                <div class="column is-half">
                    <button on:click={() => {Vote(index)}} class="button is-white is-outlined is-fullwidth">{item}</button>
                </div>
                {/each}
            </div>
        </div>
        <div id="timer-container" class="button has-margin-top-20 is-static is-full-width">Restan {clock} segundos</div>
    </div>
    
</div>
{/if}

<style>
    #get-options {
        transition: ease-out 0.4s;
        transform: translateY(-50%)
    }

    .client-chart-container {
        background: white;
        border-radius: 5px;
    }
</style>