const swal = require('sweetalert');

const vermelho = 'red'
const laranja = 'orange'
const verde = 'green'
const azul = 'blue'
const branco = 'white'
const amarelo = 'yellow'
const indefinido = 'gray'

function strToCor(corWatson){
    switch (corWatson){
        case 'amarelo': return amarelo
        case 'azul': return azul
        case 'branco': return branco
        case 'laranja': return laranja
        case 'verde': return verde
        case 'vermelho': return vermelho
        default:
            return indefinido;
    }
}

var Face = {
    frente: 0,
    direita: 1,
    costas: 2,
    esquerda: 3,
    superior: 4, 
    inferior: 5
}

var faceSelecionada = Face.frente;

function SelecionarProximaFace(){
    SetFaceSelecionada((faceSelecionada == 5 ? 0 : faceSelecionada + 1))
}

function SetFaceSelecionada(face){
    Cubo.realcarFaceSelecionada(false)
    faceSelecionada = face
    Cubo.realcarFaceSelecionada(true)
}

var representacaoCubo;

function reiniciaCubo(){    
    representacaoCubo = 
    [
        //frente
        [
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido]
        ],
        //direita
        [
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido]
        ],
        //costas
        [
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido]
        ],
        //esquerda
        [
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido]
        ],
        //cima
        [
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido]
        ],
        //baixo
        [
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido],
            [indefinido, indefinido, indefinido]
        ]
    ];
}

reiniciaCubo();

function retornaArrayCubo(face){
    switch(face){
        case Face.frente:
            return representacaoCubo[0]
        case Face.direita:
            return representacaoCubo[1]
        case Face.costas:
            return representacaoCubo[2]
        case Face.esquerda:
            return representacaoCubo[3]
        case Face.superior:
            return representacaoCubo[4]
        case Face.inferior:
            return representacaoCubo[5]
        default:
            throw 'Face do cubo invalida.'
    }    
}

function defineFace(face, arr){
    //define uma face da variavel global com as cores do cubo
    retornaArrayCubo(face) = arr
}

function mostrarErro(err){
    //tira aspas da msg se existir
    err = String(err).replace(/'/g, "\'");
    swal({
        title: 'Ops...',
        text: err,
        icon: 'error',
        buttons: [{
            text: 'Ok'
        }]
    });
}

function confirmacao(msg, callback){
    //tira aspas da msg se existir
    msg = String(msg).replace(/'/g, "\'");
    swal({
        text: msg,
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
            callback();
        }
    });    
}

function mensagemAguarde(msg){
    //tira aspas da msg se existir
    msg = String(msg).replace(/'/g, "\'");
    swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        text: msg,
        buttons: false,
        icon: 'info'
    });    
}

function mensagemSucesso(msg){
    //tira aspas da msg se existir
    msg = String(msg).replace(/'/g, "\'");
    console.log(msg)
    swal({
        title: 'Sucesso!',
        text: msg,
        button: 'Ok',
        icon: 'success'
    });    
}
function fecharMensagemAguarde(){
    swal.close();
}