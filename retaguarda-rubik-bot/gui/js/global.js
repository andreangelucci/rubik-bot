console.log('cu')

const vermelho = 'red'
const laranja = 'orange'
const verde = 'green'
const azul = 'blue'
const branco = 'white'
const amarelo = 'yellow'
const indefinido = 'blue'

function strToCor(corWatson){
    switch (corWatson){
        case 'amarelo': return amarelo
        case 'azul': return azul
        case 'branco': return branco
        case 'laranja': return laranja
        case 'verde': return verde
        case 'vermelho': return vermelho
        default:
            throw 'Cor invalida!'
    }
}

Face = {
    frente: 0,
    direita: 1,
    costas: 2,
    esquerda: 3,
    cima: 4, 
    baixo: 5
}

const representacaoCubo = [
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
]

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
        case Face.cima:
            return representacaoCubo[4]
        case Face.baixo:
            return representacaoCubo[5]
        default:
            throw 'Face do cubo invalida.'
    }    
}

function defineFace(face, arr){
    //define uma face da variavel global com as cores do cubo
    retornaArrayCubo(face) = arr
}

