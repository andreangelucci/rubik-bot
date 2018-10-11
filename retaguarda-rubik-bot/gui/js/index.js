var Video
var Cubo
var fs = require('fs')

function onLoad(){
    Video = require('./js/video/video')
    Cubo = require('./js/cubo/cubo.js')
    Video.ativaCamera()
    Cubo.criarEstruturaCubo()
}

//funcao de cpatura da tela
function keyDown(btn){
    const teclaEspaco = 32
    if (btn.keyCode == teclaEspaco){
        Video.capturaImagens();
    }
}