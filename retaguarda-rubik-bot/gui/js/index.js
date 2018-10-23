var Video
var Cubo
var fs = require('fs')

function onLoad(){
    Video = require('./js/video/video')
    Cubo = require('./js/cubo/cubo.js')
    Video.ativaCamera()
    Cubo.criarEstruturaCubo()

    document.querySelector('#btnConfirma').addEventListener(
        'click', onClickConfirmar
    );
}

//funcao de cpatura da tela
function keyDown(btn){
    const teclaEspaco = 32
    if (btn.keyCode == teclaEspaco){
        Video.capturaImagens();
    }
}

function onClickConfirmar(){
    //confirmacao do cubo        
    swal({
        text: `Tem certeza que deseja solucionar o Cubo Mágico?
        \nCertifique-se que o Rubik Bot está conectado.`,
        icon: 'info',
        buttons: [
            {
                text: "Não",
                value: false, 
                visible: true
            }, 
            {
                text: "Sim", 
                value: true,
                visible: true
            }
        ]
    }).then((value) => {
        if (value){
            try{
                throw 'falha ao falhar';
            } catch(err){
                mostrarErro(err);
            }             
        }
    });    
}