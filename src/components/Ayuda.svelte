<script>
    import Input from "./Input.svelte"
    import Messages from "./Messages.svelte"

    const openAyuda = () => {
        document.querySelector('#modal-ayuda').classList.toggle('is-active')
    }
</script>

<style lang="scss">
    .modal-content {
        width: 90vw
    }

    #faq.box {
        overflow: scroll;
        height: 80vh;

        &::-webkit-scrollbar {
            display: none
        }
    }
</style>

<div id="modal-ayuda" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="box">
            <div class="columns level">
                <div class="column is-8">
                    <div id="faq" class="box has-padding-40"> 
                        <div class="content">
                            <h1 class="has-text-link">Preguntas frecuentes</h1>
                            <h2 class="has-text-primary">CERTIFICADO</h2>
                            <h3 class="has-text-primary">&iquest;Como consigo mi certificado?</h3>
                            <p class="has-text-grey">Debes estar por lo menos un 80 % de conexi&oacute;n en los espacios del FIMPU; Adicional se debe tener participaci&oacute;n en los diferentes espacios de este evento, tales como encuestas o trivias. Estas participaciones, nos dir&aacute;n si estuviste o no en nuestro FORO FIMPU 2020.</p>
                            <h3 class="has-text-primary">&iquest;C&oacute;mo o en donde descargo mi certificado?</h3>
                            <p class="has-text-grey">En la semana siguiente al FIMPU 2020, estaremos enviado al correo electr&oacute;nico registrado, la informaci&oacute;n correspondiente para la respectiva descarga del documento.</p>
                            <h1 class="has-text-primary">FIMPU</h1>
                            <h2 class="has-text-primary">&iquest;Qu&eacute; pasa con los talleres en simultaneo y si quiero participar de varios?</h2>
                            <p class="has-text-grey">Despu&eacute;s del evento se tendr&aacute;n activas las memoras con todo lo que sucedi&oacute; durante el mismo. All&iacute; encontrara tanto los talleres como las conferencias para poder estar siempre actualizado.</p>
                            <h2 class="has-text-primary">Sobre el FIMPU</h2>
                            <p class="has-text-grey">El Foro Internacional de Medios P&uacute;blicos (FIMPU) tendr&aacute; su segunda edici&oacute;n en un escenario enriquecido con grandes interrogantes y expectativas sobre la hoja de ruta que se debe seguir para responder a las necesidades e intereses que tiene la audiencia, en lo que se ha denominado 'la nueva normalidad'. Desarrollar soluciones y modelos de operaci&oacute;n ajustados a las condiciones actuales, interpretar in&eacute;ditas formas de consumo de contenidos en un escenario de alta competencia, adaptarse con flexibilidad a vertiginosos cambios generados por una hiperconectividad impulsada por la pandemia, ser&aacute;n los temas centrales que expertos de los medios de comunicaci&oacute;n m&aacute;s importantes del mundo compartir&aacute;n con los asistentes.</p>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
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
            </div>
        </div>
    </div>
    <button on:click={openAyuda} class="modal-close is-large" aria-label="close"></button>
</div>