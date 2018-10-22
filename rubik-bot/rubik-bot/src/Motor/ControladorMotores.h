#ifndef ControladorMotor_h
#define ControladorMotor_h

#define PIN_ENABLED_MF 17
#define PIN_ENABLED_MD 18
#define PIN_ENABLED_MC 19
#define PIN_ENABLED_ME 21
#define PIN_ENABLED_MS 22
#define PIN_ENABLED_MI 23

using namespace std;

class ControladorMotor
{
    public:
        ControladorMotor();
        void executarMovimentos(char sequencia);
};

#endif