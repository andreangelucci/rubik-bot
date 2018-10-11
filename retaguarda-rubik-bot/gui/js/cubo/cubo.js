var containerCubo = document.querySelector("#preview-cubo");
var faceSuperior = document.getElementById("q01");
var faceEsquerda = document.getElementById("q10");
var faceFrente = document.getElementById("q11");
var faceDireita = document.getElementById("q12");
var faceCosta = document.getElementById("q13");
var faceInferior = document.getElementById("q21");

function retornaObjFace(face){
    switch (faceSelecionada){
        case Face.frente: return faceFrente
        case Face.direita: return faceDireita
        case Face.costas: return faceCosta
        case Face.esquerda: return faceEsquerda
        case Face.superior: return faceSuperior
        case Face.inferior: return faceInferior
    }
}

module.exports.realcarFaceSelecionada = function(realcar){
    retornaObjFace(faceSelecionada).style.backgroundColor = 
        (realcar ? 'red' : 'white')
}

module.exports.criarEstruturaCubo = function(){
    for (i = 0; i < 3; i++){
        for (j = 0; j < 4; j++){        
            var quadrante = document.createElement("div");
            quadrante.setAttribute("class", "quadrante d-inline-block");
            quadrante.id = "q"+ i.toString() + j.toString()
            containerCubo.appendChild(quadrante);

            //adiciona as pecas aos quadrantes 01 10 11 12 13 21
            if (((i != 1) & (j == 1)) || (i == 1)){
                for (x = 0; x < 3; x++){
                    for (y = 0; y < 3; y++){            
                        var contPeca = document.createElement("div");
                        contPeca.setAttribute("class", "peca d-inline-block");
                        contPeca.id = quadrante.id+ '_'+ x.toString()+ y.toString();
                        // contPeca.ondblclick = function(){
                        //     $("#modalCores").modal()
                        // }
                        contPeca.style.backgroundColor = indefinido;
                        quadrante.appendChild(contPeca);
                    }
                }
            }
        }
    }
    //define as variaveis para manutencao
    containerCubo = document.querySelector("#preview-cubo");
    faceSuperior = document.getElementById("q01");
    faceEsquerda = document.getElementById("q10");
    faceFrente = document.getElementById("q11");
    faceDireita = document.getElementById("q12");
    faceCosta = document.getElementById("q13");
    faceInferior = document.getElementById("q21");

    SetFaceSelecionada(Face.frente)
}

function atualizaQuadrante(quadrante, arr){
    //atualiza as pecas de um quadrante
    console.log(quadrante)
    console.log(arr)
    var peca
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++){            
            peca = document.querySelector(
                '#'+quadrante.id+ '_'+ i.toString()+ j.toString()
            )
            peca.style.backgroundColor = arr[i][j];
        }
    }
}

module.exports.gerarRepresentacaoCubo = function(){
    //gera a representacao do cubo baseado na variavel global
    //representacaoCubo
    atualizaQuadrante(faceFrente, representacaoCubo[0])
    atualizaQuadrante(faceDireita, representacaoCubo[1])
    atualizaQuadrante(faceCosta, representacaoCubo[2])
    atualizaQuadrante(faceEsquerda, representacaoCubo[3])
    atualizaQuadrante(faceSuperior, representacaoCubo[4])
    atualizaQuadrante(faceInferior, representacaoCubo[5])
}