#include <Arduino.h>
#include <Motor/Motor.h>
#include <constantes.h>

using namespace constantes;

Motor::Motor(int pin){
    _pinEnabled = pin;    
    pinMode(_pinEnabled, OUTPUT);
    _setHabilitado(false);
}

void Motor::_definirSentido(Sentido s){
  if (s == horario)
    digitalWrite(PIN_DIRECAO, LOW);
  else
    digitalWrite(PIN_DIRECAO, HIGH);
}

void Motor::_setHabilitado(bool value){
    if (value == true)
        digitalWrite(_pinEnabled, LOW);
    else
        digitalWrite(_pinEnabled, HIGH);
    _habilitado = value;
}

void Motor::girar(Sentido s, int voltas){        
    _definirSentido(s);
    _setHabilitado(true);    
    delay(150);
    //total de passos = 200 por rotacao
    int passos = (voltas * 50) + 3;
    for (int x = 0; x < passos; x++){
      digitalWrite(PIN_PASSOS, HIGH);
      delay(7);
      digitalWrite(PIN_PASSOS, LOW);
      delay(7);
    }
    _setHabilitado(false);
}