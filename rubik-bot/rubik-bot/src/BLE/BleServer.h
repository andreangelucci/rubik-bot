#ifndef BLE_h
#define BLE_h

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

class BLE{
    public:                
        BLE(void (*funcNovaMsg)(int i));
        void iniciarServidor();
        void setConectado(bool value);
    private:
        BLECharacteristic *caracteristicasTX;                    
        void (*_onNovaMsg)(int i);
        bool _conectado;       
};

#endif
