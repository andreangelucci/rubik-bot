//pio run && pio run --target upload --upload-port /dev/ttyUSB0 && pio device monitor
#include <Arduino.h>
#include <Motor/Motor.h>
#include <Motor/ControladorMotores.h>
#include <constantes.h>

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
            char msg = Serial.read();
            controlador.executarMovimentos(msg);
            setTrabalhando(false);
        } else {
            Serial.println("Espera, to trabalhando...");
        }
    }
    // Serial.println("Uma volta horario");
    // m1.girar(horario, 2);
    // delay(1000);
    // Serial.println("Duas volta ant-horario");
    // m1.girar(antihorario, 2);
    // delay(1000);


    // Serial.println("Uma volta horario");
    // m2.girar(horario, 2);
    // delay(1000);
    // Serial.println("Duas volta ant-horario");
    // m2.girar(antihorario, 2);
    // delay(1000);
}