var Video
var Cubo
var fs = require('fs')

function onLoad(){
    Video = require('./js/video/video')
    Cubo = require('./js/cubo/cubo.js')
    Video.ativaCamera()
    Cubo.criarEstruturaCubo()

    $('body').keydown(keyDown);
    $('#btnConfirma').click(onClickConfirmar);

    $('#btnLimpar').click(onClickLimpar);

    $('.peca-escolher').click(function(){       
        $(".img-check").remove();
        var img = $('<img class="img-check">');
        img.attr('src', './resources/check.png');
        img.appendTo(this);        
        $('.peca-escolher').attr('data-escolhido', 'n');
        $(this).attr('data-escolhido', 's');
    });
}

//funcao de cpatura da tela
function keyDown(btn){
    const teclaEspaco = 32
    if (
        (btn.keyCode == teclaEspaco) &&
        !(swal.getState().isOpen) //nenhum modal aberto
    ){
        console.log(swal.getState())
        Video.capturaImagens();
    }
}

function onClickConfirmar(){
    //confirmacao do cubo        
    confirmacao(
        `Tem certeza que deseja solucionar o Cubo Mágico?
        \nCertifique-se que o Rubik Bot está conectado.`,
        function(){
            Cubo.resolverCuboAtual()                
                .then((solucao) => {                    
                    //chamar aqui a execucao do rubik bot
                    mensagemSucesso(msg);
                })
                .catch((err) => {
                    mostrarErro(err);
                })
        }
    );
}

function onClickLimpar(){
    confirmacao(
        'Tem certeza que deseja limpar as informações do Cubo Mágico?',
        function(){
            reiniciaCubo();
            Cubo.gerarRepresentacaoCubo();
            SetFaceSelecionada(Face.frente);
        }
    )
}