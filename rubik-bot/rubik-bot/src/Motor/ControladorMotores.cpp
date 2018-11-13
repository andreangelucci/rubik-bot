//Instancia e contra os 6 motores do rubik bot
#include <Arduino.h>
#include <Motor/Motor.h>
#include <Motor/ControladorMotores.h>
#include <constantes.h>

using namespace constantes;

Motor mFrente(PIN_ENABLED_MF);
Motor mDireita(PIN_ENABLED_MD);
Motor mCosta(PIN_ENABLED_MC);
Motor mEsquerda(PIN_ENABLED_ME);
Motor mSuperior(PIN_ENABLED_MS);
Motor mInferior(PIN_ENABLED_MI);

ControladorMotor::ControladorMotor(){    
    pinMode(PIN_DIRECAO, OUTPUT);
    pinMode(PIN_PASSOS, OUTPUT);
}

void ControladorMotor::executarMovimentos(String sequencia){
    //Recebe uma string com os movimentos
    //Padrao: U L' F' B' D F' L U F' B' L B' U D2 F2 L2 U R2 F2 R2 U2 D
    //U: Cima
    //L: Esquerda
    //F: Frente
    //R: Direita
    //D: Baixo
    //B: Costas
    //': Antihorario
    //2: Movimento duplo
    Serial.println(sequencia);
    Movimento movCorrente;
    for (int i = 0; i < sequencia.length(); i++){
        if (
            (sequencia[i] == *"F") ||
            (sequencia[i] == *"R") ||
            (sequencia[i] == *"B") ||
            (sequencia[i] == *"L") ||
            (sequencia[i] == *"U") ||
            (sequencia[i] == *"D")
        ){
            movCorrente.duplo = false;
            movCorrente.sentido = horario;
            switch (sequencia[i]){
                case 'F':
                    movCorrente.motor = &mFrente;
                    break;
                case 'R':
                    movCorrente.motor = &mDireita;
                    break;
                case 'B':
                    movCorrente.motor = &mCosta;
                    break;
                case 'L':
                    movCorrente.motor = &mEsquerda;
                    break;
                case 'U':
                    movCorrente.motor = &mSuperior;
                    break;
                case 'D':
                    movCorrente.motor = &mInferior;
                    break;
            }
        } else
            if (sequencia[i] == *"'"){
                movCorrente.sentido = antihorario;
            } else
                if (sequencia[i] == *"2"){
                    movCorrente.duplo = true;
                }
        if ((sequencia[i] == *" ")||(i == sequencia.length() - 1)){
            //executa o movimento
            
            //Inverte o sentido nos motores frontal e traseiro
            if (
                (movCorrente.motor == &mFrente) ||
                (movCorrente.motor == &mCosta)
            ){
                movCorrente.sentido = (movCorrente.sentido == antihorario) ? horario : antihorario;
            }
            movCorrente.motor->girar(
                movCorrente.sentido, 
                (movCorrente.duplo) ? 2 : 1
            );
        }
    }                    
}