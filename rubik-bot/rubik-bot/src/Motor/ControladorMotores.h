#ifndef ControladorMotor_h
#define ControladorMotor_h
#include <string>

#define PIN_ENABLED_MF 17
#define PIN_ENABLED_MD 18
#define PIN_ENABLED_MC 19
#define PIN_ENABLED_ME 21
#define PIN_ENABLED_MS 22
#define PIN_ENABLED_MI 23

struct Movimento {
    Motor * motor;
    Sentido sentido;
    bool duplo;
};

class ControladorMotor
{
    public:
        ControladorMotor();
        void executarMovimentos(String sequencia);
};

#endif