<style lang="scss">
	#lobby-medios {
        background-position: bottom !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
    }

    .controls .button  {
        background: white; 
        margin-bottom: 1vh; 
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    $gradient: linear-gradient(71deg, rgba(161,0,224,1) 0%, rgba(231,60,41,1) 100%);

    .button#volver {
        background:$gradient;

        .icon {
            background: white;
            color: black;
            height: 50px;
            width: 50px;
            margin-left: -25px;
            margin-right: 20px;
        }
    }
</style>

<div id="lobby-medios" style="background: url('lobby-stands.jpg');" class="hero is-fullheight is-relative is-primary is-clipped">
	<div class="hero-body">
        <div class="container">
            <div class="columns controls">
                <div class="column is-2">
                    <a href="/medios/mintic" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio MinTIC</span></a>
                    <a href="/medios/rtvc" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio RTVC</span></a>
                </div>
                <div class="column is-3 is-offset-7">
                    <a href="/medios/canal-capital" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio Canal Capital</span></a>
                    <a href="/medios/telecaribe" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio Canal Telecaribe</span></a>
                    <a href="/medios/canal-13" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio Canal Trece</span></a>
                    <a href="/medios/tro" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio Canal TRO</span></a>
                    <a href="/medios/teleislas" class="button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Espacio Canal Teleislas</span></a>
                </div>
            </div>
        </div>
    </div>
    <div class="hero-footer">
        <div class="container">
            <a href="/lobby" id="volver" class="button is-primary has-margin-bottom-50"><span class="icon is-small"><i data-feather="chevrons-left"></i></span><span>Volver al Lobby</span></a>
        </div>
    </div>
</div>