#envia uma mensagem via serial para o Rubik Bot
#parametro 1: porta serial
#parametro 2: mensagem
#exemplo de mensagem: R L U2 R L' B2 U2 R2 F2 L2 D2 L2 F2 (solucao para o cubo montado)
import time
import sys
from serial import *

if (sys.argv[1] == None):
   raise Exception("Porta serial nao informada");

if (sys.argv[2] == None):
   raise Exception("Mensagem nao informada")

s = Serial(sys.argv[1], 9600)
s.write(sys.argv[2])
time.sleep( 60 )
s.close()
