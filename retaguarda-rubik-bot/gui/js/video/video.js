const video = document.querySelector('#videoElement');
const canvasMarcacoes = document.getElementById('canvasMarcacoes')
const canvasSnapshot = document.getElementById('canvasSnapshot')
const ctx = canvasMarcacoes.getContext("2d");

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
  ctx.strokeRect(120, 50, 50, 50)
  ctx.strokeRect(175, 50, 50, 50)
  ctx.strokeRect(230, 50, 50, 50)
  //2 linha
  ctx.strokeRect(120, 105, 50, 50)
  ctx.strokeRect(175, 105, 50, 50)
  ctx.strokeRect(230, 105, 50, 50)
  //3 linha
  ctx.strokeRect(120, 160, 50, 50)
  ctx.strokeRect(175, 160, 50, 50)
  ctx.strokeRect(230, 160, 50, 50)
}

function capturaImagens(){  
  canvasSnapshot.getContext('2d')
    .drawImage(video, 0, 0, 400, 300);
  var p1 = canvasSnapshot.getContext('2d').getImageData(120, 50, 50, 50)
  console.log(p1)
  ctx.putImageData(p1, 50, 50)
}

function keyDown(btn){
  const teclaEspaco = 32
  if (btn.keyCode == teclaEspaco){
    capturaImagens();
  }
}

desenhaMarcacoes()