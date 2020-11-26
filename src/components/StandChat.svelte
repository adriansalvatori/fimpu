<script>
    import Messages from "./Messages.svelte"
    import Input from "./Input.svelte"

    const closeModal = () => {
        document.querySelector('#standchat').classList.toggle('is-active')
    }
</script>

<style lang="scss">
</style>

<div id="standchat" class="modal">
    <div on:click={closeModal} class="modal-background"></div>
    <div class="modal-content">
        <div class="chat card">
            <div class="card-header">
                <div class="card-header-title has-text-primary">
                    ¡Haznos cualquier pregunta que tengas!
                </div>
            </div>
            <Messages room={'ayuda'} event={'ayuda'} />
            <div class="card-footer has-background-gradient has-padding-20">
                <!-- Componente de envío de eventos -->
                <Input room={'ayuda'} event={'ayuda'} />
            </div>
        </div>
    </div>
    <button on:click={closeModal} class="modal-close is-large" aria-label="close"></button>
</div>