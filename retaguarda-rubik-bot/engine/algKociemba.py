#execucao do algoritmo de kociemba
#string das posicoes recebidas no parametro 1
from kociemba import solve
import sys
import time

def resolver(defString):
    #resolve o cubo e devolve uma lista de movimentos
    t1 = time.time()
    solutionString = solve(defString)
    print(solutionString)

if (sys.argv[1] == None):
    raise Exception("Dados do cubo nao informado")
resolver(sys.argv[1])


# U L' F' B' D F' L U F' B' L B' U D2 F2 L2 U R2 F2 R2 U2 D
