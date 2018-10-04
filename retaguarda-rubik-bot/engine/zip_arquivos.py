#gera um arquivo zip com as imagens capturadas do rubik cube
import os
import sys
import zipfile

#parametro 0: diretorio das imagens
#apaga o arquivo zipado caso ja exista
path = sys.argv[2];
if (os.path.exists(path)):
    os.remove(path)

arq_zipado = zipfile.ZipFile(path, 'a')
for i in range(0, 8):
    arq_img = os.path.join(sys.argv[1], 'p{}.png'.format(i))    
    if not(os.path.exists(arq_img)):
        raise Exception('Arquivo {} nao existe.'.format(arq_img))
    # arq_zipado.write(arq_img, os.path.relpath(arq_img), compress_type = zipfile.ZIP_DEFLATED)
    arq_zipado.write(arq_img, os.path.relpath(arq_img), compress_type = zipfile.ZIP_DEFLATED)
arq_zipado.close()