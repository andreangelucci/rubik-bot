var Video
var fs = require('fs')

//funcao de cpatura da tela
function keyDown(btn){
    const teclaEspaco = 32
    if (btn.keyCode == teclaEspaco){
        Video.capturaImagens();
    }
}

function onLoad(){
    Video = require('./js/video/video')
    Video.ativaCamera()
}