<div id="agenda-interactiva" class="modal">
    <div on:click={closeModal} class="modal-background"></div>
    <div class="modal-content">
        <div class="container">
            <div class="columns">
                <div class="column is-one-third">
                    <div class="box">
                        <article class="media">
                            <div class="media-left has-text-primary">
                                <figure class="image is-64x64">
                                    <i data-feather="calendar"></i>
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content has-margin-bottom-20">
                                    <strong class="has-text-primary has-margin-bottom-10">Actos Protocolarios - Instalación</strong>
                                    <br>
                                    <div class="button is-small is-primary is-outlined">
                                        <span class="icon is-small"><i data-feather="clock"></i></span> 
                                        <small>9:00am</small>
                                    </div>
                                    <div class="button is-small is-link is-outlined">
                                        <span class="icon is-small"><i data-feather="users"></i></span> 
                                        <small>Auditorio Principal</small>
                                    </div>
                                </div>
                                <div class="content is-small">
                                    	<strong>Apertura del foro:</strong>
                                        <ul>
                                            <li>Iván Duque Márquez</li>
                                            <li>Presidente de la República de Colombia</li>
                                            <li>CO</li>
                                        </ul>
                                        <strong>Apertura del foro:</strong>
                                        <ul>
                                            <li>Karen Abudinen</li>
                                            <li>Ministra TIC</li>
                                        </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="column is-one-third">
                    <div class="box">
                        <article class="media">
                            <div class="media-left has-text-primary">
                                <figure class="image is-64x64">
                                    <i data-feather="calendar"></i>
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content has-margin-bottom-20">
                                    <strong class="has-text-primary has-margin-bottom-10">Actos Protocolarios - Instalación</strong>
                                    <br>
                                    <div class="button is-small is-primary is-outlined">
                                        <span class="icon is-small"><i data-feather="clock"></i></span> 
                                        <small>9:00am</small>
                                    </div>
                                    <div class="button is-small is-link is-outlined">
                                        <span class="icon is-small"><i data-feather="users"></i></span> 
                                        <small>Auditorio Principal</small>
                                    </div>
                                </div>
                                <div class="content is-small">
                                    	<strong>Apertura del foro:</strong>
                                        <ul>
                                            <li>Iván Duque Márquez</li>
                                            <li>Presidente de la República de Colombia</li>
                                            <li>CO</li>
                                        </ul>
                                        <strong>Apertura del foro:</strong>
                                        <ul>
                                            <li>Karen Abudinen</li>
                                            <li>Ministra TIC</li>
                                        </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="column is-one-third">
                    <div class="box">
                        <article class="media">
                            <div class="media-left has-text-primary">
                                <figure class="image is-64x64">
                                    <i data-feather="calendar"></i>
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content has-margin-bottom-20">
                                    <strong class="has-text-primary has-margin-bottom-10">Actos Protocolarios - Instalación</strong>
                                    <br>
                                    <div class="button is-small is-primary is-outlined">
                                        <span class="icon is-small"><i data-feather="clock"></i></span> 
                                        <small>9:00am</small>
                                    </div>
                                    <div class="button is-small is-link is-outlined">
                                        <span class="icon is-small"><i data-feather="users"></i></span> 
                                        <small>Auditorio Principal</small>
                                    </div>
                                </div>
                                <div class="content is-small">
                                    	<strong>Apertura del foro:</strong>
                                        <ul>
                                            <li>Iván Duque Márquez</li>
                                            <li>Presidente de la República de Colombia</li>
                                            <li>CO</li>
                                        </ul>
                                        <strong>Apertura del foro:</strong>
                                        <ul>
                                            <li>Karen Abudinen</li>
                                            <li>Ministra TIC</li>
                                        </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button on:click={closeModal} class="modal-close is-large" aria-label="close"></button>
</div>

<script>
    const closeModal = () => {
        document.querySelector('#agenda-interactiva').classList.toggle('is-active')
    }
</script>

<style>
    .modal-content {
        width: 90vw;
        height: 90vh;
        display: flex;
        align-items: center;
    }
</style>