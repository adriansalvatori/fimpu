<style lang="scss">
  
    // $gradient: linear-gradient(71deg, rgba(161,0,224,1) 0%, rgba(231,60,41,1) 100%);

    iframe {
        width: 100%;
        height: 400px;
    }
</style>

<div id="lobby-salas" class="hero is-fullheight is-relative0 is-clipped">
    <div class="hero-header has-padding-30">
        <div class="columns">
            <div class="column is-5"><img src="logo-salas.svg" alt=""></div>
            <div class="column is-3 is-offset-4">
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Perfil</span></a>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Agenda</span></a>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Configuración</span></a>
                <a href="lobby" class="button is-primary is-small is-outlined"><span class="icon is-small"><i data-feather="user"></i></span><span>Ayuda</span></a>
            </div>
        </div>
    </div>
	<div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column is-8">
                    <!-- Streamline Central -->
                    <div class="iframe-container box">
                        <iframe title="" src="https://www.youtube.com/embed/onaXveWIqhA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="column is-4">
                    <!-- Caja de Preguntas -->
                    <div class="questions box  has-background-primary">
                        <div class="title is-4 has-text-white">Preguntas para el Panelísta</div>
                        <!-- Componente de envío de eventos -->
                    </div>
                    <!-- Caja de Comentarios -->
                    <div class="comments card">
                        <div class="card-content"></div>
                        <div class="card-footer">
                             <!-- Componente de envío de eventos -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hero-footer">
        <img class="decoration" src="decoration.svg" alt="">
    </div>
</div>