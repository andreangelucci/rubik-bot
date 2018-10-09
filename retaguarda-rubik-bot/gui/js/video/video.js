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

function detectarCor(imgPath, callback){    
    var img = fs.createReadStream(imgPath);
    var classificador = ["DefaultCustomModel_527294892"];
    var porcentagem_minima = 0.6;
    var parametros = {
      images_file: img,
      classifier_ids: classificador,
      threshold: porcentagem_minima
    };
    watsonRecognition.classify(
      parametros, function(err, response){
        if (err)
          console.log(err)
        else {
          // console.log(response.images[0].image+ ': '+ response.images[0].classifiers[0].classes[0].class)
          callback(response)
          // console.log(JSON.stringify(response, null, 2));
          // callback('oi');
        }
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
  
  var arqZipado = require('path').join(__dirname, './imgs-cubo/face_cubo.zip');
  require('./linker/zip_arquivos.js').ziparImagens(
    arqZipado, function(){
      //zipou com sucesso, envia ao watson
      detectarCor(arqZipado, function(analise){
        //cores detectadas, trabalha a resposta
        const classificadorCores = 'DefaultCustomModel_527294892'
        analise.images.forEach(img => {
          var cor = ''
          var taxa = 0
          var idx = /p(\d)\./.exec(img.image)
          if (idx.length > 0){
            idx = idx[1]
            img.classifiers.forEach(classe => {
              if (classe.classifier_id == classificadorCores){
                cor = 'indefinido'
                taxa = 0
                //pega a cor com a taxa maior de probabilidade
                classe.classes.forEach(classeCor => {
                  if (classeCor.score > taxa){
                    taxa = classeCor.score
                    cor = classeCor.class
                  }
                })
              }
            })
            //alimentar matriz com as cores aqui
            testevariavel = 'indice '+ idx+ ' cor: '+ cor
            require('./js/cubo/cubo.js').testeVar()
          }          
        })
      })
    }
  )

  // detectarCor(
  //   '', function(str){
  //     console.log(str);
  //   });
}

function keyDown(btn){
  const teclaEspaco = 32
  if (btn.keyCode == teclaEspaco){
    capturaImagens();
  }
}

desenhaMarcacoes()