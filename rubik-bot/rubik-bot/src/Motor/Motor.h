#ifndef Motor_h
#define Motor_h

enum Sentido {horario, antihorario};

#define PIN_DIRECAO 19
#define PIN_PASSOS 18

class Motor
{
  public:
    Motor(int pinEnabled);    
    void girar(Sentido s, int voltas);
  private:
    int _pinEnabled;
    bool _habilitado;
    void _setHabilitado(bool value);
    void _definirSentido(Sentido s);
};

#endif