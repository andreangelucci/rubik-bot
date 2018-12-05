var mili = 0;
var segundo = 0;
var executando = false;
var func;

function onClickCronometro(tecla){    
    if (!executando){
        mili = 0;
        segundo = 0;        
        document.querySelector("#sessaoCronometro").style.backgroundColor = "#FF0000";
        func = setInterval(timer, 55);
    } else {
        clearInterval(func);
        document.querySelector("#mensagemCronometro").innerHTML = "Cubo-Mágico finalizado!";
        document.querySelector("#sessaoCronometro").setAttribute(
            "background-color", "transparent"
        );
    }
    executando = !executando;
}

function formataSegundo(seg){
    while (seg.length < 2)
        seg = "0"+ seg;
    return seg;
}

function formataMili(mili){
    while (mili.length < 3)
        mili = "0"+ mili;
    return mili;
}

function timer(){
    if (mili < 999){
        mili += 55;
        if (mili >= 1000)
            mili = 999;
    } else {
        segundo++;
        mili = 0;
    }    
    document.querySelector("#cronometro").innerHTML =
        formataSegundo(segundo.toString())+ ":"+ formataMili(mili.toString());
}