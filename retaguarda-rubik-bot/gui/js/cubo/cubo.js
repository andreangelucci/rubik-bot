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
        (realcar ? '#3ae178' : 'white')
}

function alteracaoManualPeca(pecaElement){
    //a identificacao da peca esta em seu id
    var regexId = /(\d{2})_(\d{2})/.exec(pecaElement.id)
    if (regexId.length == 3){
        //descobre a face clicada
        var faceAlterar        
        switch (regexId[1]){
            case "01": 
                faceAlterar = Face.superior;
                break;
            case "10":
                faceAlterar = Face.esquerda;
                break;
            case "11": 
                faceAlterar = Face.frente;
                break;
            case "12":
                faceAlterar = Face.direita;
                break;
            case "13": 
                faceAlterar = Face.costas;
                break;
            case "21": 
                faceAlterar = Face.inferior;
                break;
            default:
                throw "Face selecionada nao encontrada."
        }        

        //var telaEscolher = document.querySelector('#cores-escolher');  
        var modalCores = document.querySelector('#cores-escolher');
        swal({        
            content: modalCores,
            closeOnClickOutside: false,
            closeOnEsc: false,
            text: 'Selecione a nova cor para a peça:',
            buttons: {confirm: 'Confirmar'}            
        }).then((value) => {
            if (value){
                $('.peca-escolher').each(function(){
                    if($(this).attr('data-escolhido') == 's'){
                        representacaoCubo[faceAlterar]
                        [regexId[2][0]][regexId[2][1]] = $(this).attr('data-color');
                        Cubo.gerarRepresentacaoCubo();
                    }
                });
            }
        });
        
        // alert(
        //     representacaoCubo[faceAlterar]
        //     [regexId[2][0]][regexId[2][1]]
        // )

        console.log('continuei... ')
        var qdt = regexId[1]
        var pc = regexId[2]        
    }

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
                        contPeca.addEventListener("dblclick", function(){
                            alteracaoManualPeca(this)
                        })
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

    // try {        
    //     this.resolverCuboAtual()
    // } catch(err){
    //     alert(err)
    // }
        
}

module.exports.resolverCuboAtual = function(){
    //gera uma string com o posicionamento atual do cubo
    //e envia para o algoritmo de Kociemba
    //padrao: UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB
    //identifica a cor dos centros de face:

    require('../../linker/algKociemba').resolverCubo(
        'FUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB',
        function(err, resultado){
            if (err)
                alert(err)
            else    
                alert(resultado)
        }
    )

    try{
        
    } catch(e){
        alert(e)
    }    

    var corS = representacaoCubo[Face.superior][1][1]
    var corF = representacaoCubo[Face.frente][1][1]
    var corD = representacaoCubo[Face.direita][1][1]
    var corE = representacaoCubo[Face.esquerda][1][1]
    var corC = representacaoCubo[Face.costas][1][1]
    var corI = representacaoCubo[Face.inferior][1][1]

    var definitionString

    for (f in Face){
        let s
        let fAnalise = representacaoCubo[Face[f]]
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                switch (fAnalise[i][j]){
                    case corS:
                        s = 'U'
                        break
                    case corF:
                        s = 'F'
                        break
                    case corD: 
                        s = 'R'
                        break
                    case corE:
                        s = 'L'
                        break
                    case corC:
                        s = 'B'
                        break
                    case corI:
                        s = 'L'
                        break
                    default:
                        console.log(fAnalise[i][j])
                        throw "Existem peças invalidas no cubo."                        
                }
            }
        }
        definitionString =+ s
    }
    console.log(definitionString)
}