<style lang="scss">
	#lobby-medios {
        background-position: bottom !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
    }

    .controls .button  {
        margin-bottom: 1vh; 
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 2.2vh;
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
            <div class="columns is-mobile controls">
                <div class="column is-2">
                    <a href="/medios/mintic" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>MinTIC</span></a>
                    <a href="/medios/rtvc" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>RTVC</span></a>
                </div>
                <div class="column is-3 is-offset-7">
                    <a href="/medios/canal-capital" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Canal Capital</span></a>
                    <a href="/medios/telecaribe" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Telecaribe</span></a>
                    <a href="/medios/canal-13" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Canal Trece</span></a>
                    <a href="/medios/tro" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Canal TRO</span></a>
                    <a href="/medios/teleislas" class="button is-rounded is-primary is-uppercase has-text-weight-bold is-control"><span class="icon is-small"><i data-feather="share-2"></i></span><span>Teleislas</span></a>
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