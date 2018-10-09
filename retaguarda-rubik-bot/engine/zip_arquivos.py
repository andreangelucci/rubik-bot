#gera um arquivo zip com as imagens capturadas do rubik cube
import os
import sys
import zipfile

#parametro 0: diretorio das imagens
#apaga o arquivo zipado caso ja exista
path = sys.argv[1]
if (os.path.isfile(path)):
    os.remove(path)

diretorio = os.path.dirname(path)
arq_zipado = zipfile.ZipFile(path, 'w')
for i in range(0, 9):
    arq_img = os.path.join(diretorio, 'p{}.png'.format(i))    
    if not(os.path.exists(arq_img)):
        raise Exception('Arquivo {} nao existe.'.format(arq_img))
    arq_zipado.write(arq_img, os.path.basename(arq_img), compress_type = zipfile.ZIP_DEFLATED)
arq_zipado.close()