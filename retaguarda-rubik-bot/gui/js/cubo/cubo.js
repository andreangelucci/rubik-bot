// var container = document.createElement("div");
// container.setAttribute("class", "container-cubo");

var containerCubo = document.querySelector("#preview-cubo");

for (i = 0; i < 3; i++){
    for (j = 0; j < 4; j++){        
        var quadrante = document.createElement("div");
        quadrante.setAttribute("class", "quadrante d-inline-block");
        quadrante.id = "q"+ i.toString() + j.toString()
        // quadrante.setAttribute("id", );
        containerCubo.appendChild(quadrante);
    }
}
// document.getElementById("preview-cubo").appendChild(container);

var faceSuperior = document.getElementById("q01");
var faceEsquerda = document.getElementById("q10");
var faceFrente = document.getElementById("q11");
var faceDireita = document.getElementById("q12");
var faceCosta = document.getElementById("q13");
var faceInferior = document.getElementById("q21");

function atualizaQuadrante(quadrante, arr){
    //atualiza as pecas de um quadrante
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

function gerarRepresentacaoCubo(){
    //gera a representacao do cubo baseado na variavel global
    //representacaoCubo
    atualizaQuadrante(faceFrente, representacaoCubo[0])
    atualizaQuadrante(faceDireita, representacaoCubo[1])
    atualizaQuadrante(faceCosta, representacaoCubo[2])
    atualizaQuadrante(faceEsquerda, representacaoCubo[3])
    atualizaQuadrante(faceSuperior, representacaoCubo[4])
    atualizaQuadrante(faceInferior, representacaoCubo[5])
}

addFace(
    faceEsquerda,
    [
        [vermelho, vermelho, vermelho],
        [vermelho, vermelho, vermelho],
        [vermelho, vermelho, vermelho]
    ]
)

addFace(
    faceFrente,
    [
        [branco, branco, branco],
        [branco, branco, branco],
        [branco, branco, branco]
    ]
)

addFace(
    faceSuperior,
    [
        [azul, azul, azul],
        [azul, azul, azul],
        [azul, azul, azul]
    ]
)

addFace(
    faceDireita,
    [
        [laranja, laranja, laranja],
        [azul, laranja, amarelo],
        [laranja, laranja, laranja]
    ]
)

addFace(
    faceCosta,
    [
        [amarelo, amarelo, amarelo],
        [amarelo, amarelo, amarelo],
        [amarelo, amarelo, amarelo]
    ]
)

addFace(
    faceInferior,
    [
        [verde, verde, verde],
        [verde, verde, verde],
        [verde, verde, verde]
    ]
)

function addFace(quadrante, arr){
    //adiciona uma face a um quadrante
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++){            
            var contPeca = document.createElement("div");
            contPeca.setAttribute("class", "peca d-inline-block");
            contPeca.id = quadrante.id+ '_'+ i.toString()+ j.toString();
            contPeca.ondblclick = function(){
                $("#modalCores").modal()
            }
            // var peca = document.createElement("figure");
            // peca.setAttribute("class", "peca");
            contPeca.style.backgroundColor = arr[i][j];
            // contPeca.appendChild(peca);
            quadrante.appendChild(contPeca);
        }
    }
}

gerarRepresentacaoCubo()