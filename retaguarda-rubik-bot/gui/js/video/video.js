const fs = require('fs');
const video = document.querySelector('#videoElement');
const canvasMarcacoes = document.getElementById('canvasMarcacoes')
const canvasSnapshot = document.getElementById('canvasSnapshot')
const canvasPeca = document.getElementById('canvasPeca')
const ctx = canvasMarcacoes.getContext("2d");
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var watsonRecognition = new VisualRecognitionV3({
  url: 'https://gateway.watsonplatform.net/visual-recognition/api',
  version: '2018-03-19',
  iam_apikey: 'MKUJInbtHNYUvnVqi8tVHSDatBL0fUwT12NK46PeAmvw'
});

function detectarCor(imgPath){    
    var img = fs.createReadStream(imgPath);
    var classificador = ["DefaultCustomModel_527294892"];
    var porcentagem_minima = 0.6;
    var parametros = {
      images_file: img,
      classifier_ids: classificador,
      threshold: porcentagem_minima
    };
    console.log(imgPath);
    watsonRecognition.classify(
      parametros, function(err, response){
        if (err)
          console.log(err)
        else
          // console.log(response.images[0].image+ ': '+ response.images[0].classifiers[0].classes[0].class)
          console.log(JSON.stringify(response, null, 2));
        }
    )
}

//vetores x,y com a posicao de cada peca
//width: 50 heigth: 50
const arrPecas = [
  [120,  50], [175,  50], [230,  50],
  [120, 105], [175, 105], [230, 105],
  [120, 160], [175, 160], [230, 160]
]

if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err0r) {
    console.log(err0r)
    console.log("Não foi possível acessar a webcam.");
  });
}

function desenhaMarcacoes(){
  ctx.clearRect(0, 0, canvasMarcacoes.width, canvasMarcacoes.heigh);
  ctx.strokeStyle = '#00FF00';
  ctx.lineWidth = 2;
  //desenha as marcacoes para posicionar o cubo
  for (i in arrPecas){    
    ctx.strokeRect(arrPecas[i][0], arrPecas[i][1], 50, 50)  
  }
}

function capturaImagens(){  
  //salva as fotos do cubo
  canvasSnapshot.getContext('2d')
    .drawImage(video, 0, 0, 400, 300);
  for (i in arrPecas){
    canvasPeca.getContext('2d').putImageData(
      canvasSnapshot.getContext('2d').getImageData(arrPecas[i][0], arrPecas[i][1], 50, 50),
      0, 0
    );
    var imgBuffer = new Buffer(
      canvasPeca.toDataURL().replace(/^data:image\/\w+;base64,/, ""),
      'base64'
    )
    fs.writeFile('./imgs-cubo/p'+ i+ '.png', imgBuffer, function(err){
      console.log('Falha ao salvar imagem: '+err)
    })
    // detectarCor('./imgs-cubo/p'+ i+ '.png');    
  }  
  //tenta zipar as imagens chamando o comando no terminal...
  detectarCor('./imgs-cubo/teste.zip');
}

function keyDown(btn){
  const teclaEspaco = 32
  if (btn.keyCode == teclaEspaco){
    capturaImagens();
  }
}

desenhaMarcacoes()