#envia uma mensagem via serial para o Rubik Bot
#parametro 1: porta serial
#parametro 2: mensagem
import sys
import serial

if (sys.argv[1] == None):
    raise Exception("Porta serial nao informada");

if (sys.argv[2] == None):
    raise Exception("Mensagem nao informada")

#s = serial.Serial(sys.argv[1], 9600)
s = serial.Serial(sys.argv[1], 9600)
s.write(sys.argv[2])