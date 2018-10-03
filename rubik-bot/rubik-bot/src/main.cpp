#include <Arduino.h>
#include <Motor/Motor.h>
#include <BLE/BleServer.h>

// #define PIN_ENABLED_M1 22
// #define PIN_ENABLED_M2 23

// Motor m1(PIN_ENABLED_M1);
// Motor m2(PIN_ENABLED_M2);

void onBLEMsg(int i){
    //nova mensagem recebida via BLE
    // if (i == 1){
    //     m1.girar(horario, 1);
    // } else {
    //     m2.girar(horario, 2);
    // }
}

void (*ptr)(int i) = &onBLEMsg;
BLE ble(*ptr);

void setup() {
    // put your setup code here, to run once:
    Serial.begin(9600);        
    ble.iniciarServidor();
    pinMode(PIN_DIRECAO, OUTPUT);
    pinMode(PIN_PASSOS, OUTPUT);
}

void loop() {
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