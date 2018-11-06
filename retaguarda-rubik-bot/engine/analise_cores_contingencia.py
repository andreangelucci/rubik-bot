import cv2
import sys

def detectaCor(bgr):
	# analisa um vetor bgr (blue, gren, red)
	# e retorna sua cor correspondente.
	percAzul = (bgr[0] * 100) / 255
	percVerde = (bgr[1] * 100) / 255
	percVermelho = (bgr[2] * 100) / 255	
	variacao = (bgr[0] + bgr[1] + bgr[2]) / 3
	if (
		(
			((variacao - 20) <= bgr[0] <= (variacao + 20)) and
			((variacao - 20) <= bgr[1] <= (variacao + 20)) and 
			((variacao - 20) <= bgr[2] <= (variacao + 20))
		) or ((bgr[0] >= 100) and (bgr[1] >= 100) and (bgr[2] >= 100))
	):
		return 'branco'
	if ((percVermelho > 45) and (percVermelho > (percAzul + percVerde))):
		return 'laranja'
	if ((percVermelho > percAzul) and (percVermelho > percVerde)):
		return 'vermelho'
	if ((percVerde > percVermelho) and (percVermelho > percAzul)):
		return 'amarelo'
	if ((percVerde > percAzul) and (percAzul > percVermelho)):
		return 'verde'
	if ((percAzul > percVerde) and (percVerde > percVermelho)):
		return 'azul'
	return 'indefinido'

def analisaArea(imagem, centro, alcance):
	if (imagem is None):
		raise Exception("Imagem invalida")
	#imagem que sera analisada
	#centro: pixel que sera considerado como centro de um quadrado de analise
	#alcance: distancia entre o centro e os lados desse quadrado.
	iniX = int(centro[0]) - alcance
	fimX = int(centro[0]) + alcance
	iniY = int(centro[1]) - alcance
	fimY = int(centro[1]) + alcance
	#captura a cor dos pixels da area
	resultados = []
	for x in range(iniX, fimX + 1):	
		for y in range(iniY, fimY + 1):
			resultados.append(imagem[x, y])
	#calcula um rgb medio com os array
	#descartando pixels com valores fora da media (lixo)
	rgbMedia = [0, 0, 0]
	for item in resultados:
		rgbMedia[0] += item[0] #R
		rgbMedia[1] += item[1] #G
		rgbMedia[2] += item[2] #B
	#calcula a media
	rgbMedia = [
		rgbMedia[0] / len(resultados),
		rgbMedia[1] / len(resultados),
		rgbMedia[2] / len(resultados),
	]	
	#retorna a cor da media encontrada
	return detectaCor(rgbMedia)

#analise a foto de uma peca e retorna sua cor
img = cv2.imread(sys.argv[1])
print(analisaArea(img, [25, 25], 24))