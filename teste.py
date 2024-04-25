#DIMENSÕES DO PROJETO
DIM_DO_PROJ_X = float(input("Digite o largura em metros total do projeto: "))
DIM_DO_PROJ_Y = float(input("Digite a altura em metros total do projeto: "))

#DIMENSÕES DA IMAGEM
DIM_IMG_X = float(input("Digite a resolução em pixel da imagem em x: "))
DIM_IMG_Y = float(input("Digite a resulução em pixel da imagem em y: "))

#CALCULO PIXEL POR METRO
ppm_l = DIM_IMG_X / DIM_DO_PROJ_X
ppm_h = DIM_IMG_Y / DIM_DO_PROJ_Y

#CALCULO PIXEL POR METRO REAL
ppm = (ppm_l+ppm_h)/2
print(int(ppm))

#RECEBE AREA DA PATOLOGIA(RETANGULO)
rec1_l = float(input("Largura em metros da área da patologia: "))
rec1_h = float(input("Altura em metros da área da patologia: "))

#TRANSFORMA DIMENSOES DA PATOLOGIA PARA PX
rec_l_px = rec1_l*ppm
rec_h_px = rec1_h*ppm
print("Largura retangulo em px: ", int(rec_l_px))
print("Altura retangulo em px: ", int(rec_h_px))

#ENCONTRA CENTRO DA PATOLOGIA
rec_l_px_c = rec_l_px/2
rec_h_px_c = rec_h_px/2

#RECEBE O PONTO CENTRAL DA PATOLOGIA
pc_x = float(input("Digite a coordenada x em metros referente ao ponto central da patologia: "))
pc_y = float(input("Digite a coordenada y em metros referente ao ponto central da patologia: "))

#TRANSFORMA DIMENSOES DO CENTRO PARA PX
pc_x_px = pc_x*ppm
pc_y_px = pc_y*ppm

#ENCONTRA O LOCAL DA PATOLOGIA
x = pc_x_px-rec_l_px_c
y = pc_y_px-rec_h_px_c

print(int(x),int(y))
