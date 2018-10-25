//constantes para capturar as imagens do cubo
const video = document.querySelector('#videoElement');
const canvasMarcacoes = document.getElementById('canvasMarcacoes')
const canvasSnapshot = document.getElementById('canvasSnapshot')
const canvasPeca = document.getElementById('canvasPeca')
const ctx = canvasMarcacoes.getContext("2d");
//vetores x,y com a posicao de cada peca
//width: 50 heigth: 50
const arrPecas = [
  [120,  50], [175,  50], [230,  50],
  [120, 105], [175, 105], [230, 105],
  [120, 160], [175, 160], [230, 160]
]

function desenhaMarcacoes(){
  ctx.clearRect(0, 0, canvasMarcacoes.width, canvasMarcacoes.heigh);
  ctx.strokeStyle = '#00FF00';
  ctx.lineWidth = 2;
  //desenha as marcacoes para posicionar o cubo
  for (i in arrPecas){    
    ctx.strokeRect(arrPecas[i][0], arrPecas[i][1], 50, 50)  
  }
}

module.exports.ativaCamera = function(link, pathImg, callback){
  if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
      video.srcObject = stream;
      desenhaMarcacoes()
    })
    .catch(function(err0r) {
      console.log(err0r)
      console.log("Não foi possível acessar a webcam.");
    });
  }
}

module.exports.capturaImagens = function(){  
  //salva as fotos do cubo
  mensagemAguarde('Analisando imagem, aguarde...');
  const watson = require('./watsonRecognize')
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
      if (err)
        console.log('Falha ao salvar imagem: '+err)
    })
  }  
  var arqZipado = require('path').join(__dirname, '../../imgs-cubo/face_cubo.zip');
  require('../../linker/zip_arquivos').ziparImagens(
    arqZipado, function(){
      //zipou com sucesso, envia ao watson
      const classificadorCores = 'DefaultCustomModel_527294892'
      watson.detectarCor(arqZipado, classificadorCores, function(analise){
        //cores detectadas, trabalha a resposta        
        analise.images.forEach(img => {
          var cor = ''
          var taxa = 0
          var idx = /p(\d)\./.exec(img.image)
          if (idx.length > 0){
            idx = idx[1]
            img.classifiers.forEach(classe => {
              if (classe.classifier_id == classificadorCores){
                cor = indefinido
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
            auxX = Math.floor(idx / 3)
            idxY = idx;
            if (idxY < 3)
              auxY = idxY;
            else {
              while (idxY >= 3)
                idxY -= 3;
            }
            auxY = idxY;
            representacaoCubo[faceSelecionada][auxX][auxY] = strToCor(cor);
          }          
        })
        Cubo.gerarRepresentacaoCubo()
        SelecionarProximaFace();
        fecharMensagemAguarde();
      })
    }
  )
}