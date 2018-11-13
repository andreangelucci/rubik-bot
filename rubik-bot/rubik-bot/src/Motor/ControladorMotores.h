#ifndef ControladorMotor_h
#define ControladorMotor_h
#include <string>

#define PIN_ENABLED_MC 17
#define PIN_ENABLED_MI 18
#define PIN_ENABLED_ME 19
#define PIN_ENABLED_MD 21
#define PIN_ENABLED_MS 22
#define PIN_ENABLED_MF 23

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