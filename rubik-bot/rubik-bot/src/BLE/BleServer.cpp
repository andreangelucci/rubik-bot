#include <Arduino.h>
#include <BLE/BleServer.h>
#include <Motor/Motor.h>

#define SERVICE_UUID "ab0828b1-198e-4351-b779-901fa0e0371e"
#define CHARACTERISTIC_UUID_RX "4ac8a682-9736-4e5d-932b-e9b31405049c"
#define CHARACTERISTIC_UUID_TX "0972EF8C-7613-4075-AD52-756F33D4DA91"

#define PIN_ENABLED_M1 15
#define PIN_ENABLED_M2 22
#define PIN_ENABLED_M3 23

Motor m1(PIN_ENABLED_M1);
Motor m2(PIN_ENABLED_M2);
Motor m3(PIN_ENABLED_M3);

class ServerCallbacks:
    public BLEServerCallbacks {
        void onConnect(BLEServer* pServer) {
            //ble.setConectado(true);
            Serial.println("Conectado");
        };
 
        void onDisconnect(BLEServer* pServer) {
            //ble.setConectado(false);
            Serial.println("Conectado");
        }
    };

class CharacteristicCallbacks:
    public BLECharacteristicCallbacks {
        void onWrite(BLECharacteristic *characteristic) {
            //retorna ponteiro para o registrador contendo o valor atual da caracteristica
            std::string rxValue = characteristic->getValue(); 
            //verifica se existe dados (tamanho maior que zero)
            if (rxValue.length() > 0) { 
                for (int i = 0; i < rxValue.length(); i++) {
                    Serial.print(rxValue[i]);
                }   
            }
            if (rxValue.find("1")){
                Serial.println("Motor 1..d");
                m1.girar(horario, 2);
            } else
                if (rxValue.find("2"))                
                    m2.girar(horario, 2);
                else
                    if (rxValue.find("3"))
                        m3.girar(horario, 1);
            
        }
};

BLE::BLE(void (*funcNovaMsg)(int i)){
    // (*_onNovaMsg) = &(funcNovaMsg);
}

void BLE::iniciarServidor(){
    BLEDevice::init("rubik-bot");
    BLEServer *servidor = BLEDevice::createServer();
    // ServerCallbacks sv;
    // sv.BLEServerCallbacks.ble = this;
    servidor -> setCallbacks(new ServerCallbacks());
    BLEService *servico = servidor -> createService(SERVICE_UUID);
    // Create a BLE Characteristic para envio de dados
    caracteristicasTX = servico->createCharacteristic(
        CHARACTERISTIC_UUID_TX,
        BLECharacteristic::PROPERTY_NOTIFY
    ); 
    caracteristicasTX->addDescriptor(new BLE2902());
    // Create a BLE Characteristic para recebimento de dados
    BLECharacteristic *characteristic = servico->createCharacteristic(
        CHARACTERISTIC_UUID_RX,
        BLECharacteristic::PROPERTY_WRITE
    );
 
    characteristic->setCallbacks(new CharacteristicCallbacks());
 
    // Start the service
    servico->start();
 
    // Start advertising (descoberta do ESP32)
    servidor->getAdvertising()->start(); 
    Serial.println("Aguardando algum dispositivo conectar...");
}

void BLE::setConectado(bool value){
    _conectado = value;
    //Serial.println("Servidor "+ ((_conectado) ? "conectado" : "desconectado")+ ".");
}
