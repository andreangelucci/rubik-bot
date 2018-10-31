//pio run && pio run --target upload --upload-port /dev/ttyUSB0 && pio device monitor
#include <Arduino.h>
#include <Motor/Motor.h>
#include <Motor/ControladorMotores.h>
#include <constantes.h>
#include <string>

using namespace constantes;

bool _trabalhando;
ControladorMotor controlador;

void setTrabalhando(bool value){    
    _trabalhando = value;
    digitalWrite(PIN_ONBOARD_LED, 
        (_trabalhando) ? HIGH : LOW
    );
}

void setup() {
    // put your setup code here, to run once:
    Serial.begin(9600);   
    pinMode(PIN_ONBOARD_LED, OUTPUT);
    controlador = ControladorMotor();
}

void loop() {
    if (Serial.available()){
        //recebe a sequencia de movimento dos motores atravez
        //da porta serial
        if (!_trabalhando){
            setTrabalhando(true);
            //std::string msg ();
            controlador.executarMovimentos(
                Serial.readStringUntil('\r\n')
            );
            setTrabalhando(false);
        } else {
            Serial.println("Espera, to trabalhando...");
        }
    }        
}