<script>
    /**
     * El componente Input está pensado para siempre 
     * despachar un evento de socket.io
     * 
     * Obtiene un objeto con el nombre del evento a despachar
    */	

    function handleSubmit() {
		socket.emit("message", "Esto es un mensaje de prueba")
	}

</script>

<div class="box is-full-width is-rounded">
    <form action="">
        <div class="columns">
            <div class="column is-10"> <input type="text" class="input" value="Escribir"></div>
            <div class="column is-2"><button on:click|preventDefault={handleSubmit} class="button"><span class="icon is-small"><i data-feather="send"></i></span></button></div>
        </div>
    </form>
</div>
