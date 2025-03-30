import math 

print("-"*50)
print("Definição do ponto 1")
x1 = float(input("Digite o x da posição 1: "))
y1 = float(input("Digite o y da posição 1: "))
print("-"*50)
print("Definição do ponto 2")
x2 = float(input("Digite o x da posição 2: "))
y2 = float(input("Digite o y da posição 2: "))
print("-"*50)

distancia = math.sqrt(((x2-x1)**2)+((y2-y1)**2))
print(f"A distância entre os pontos ({x1},{y1}) e ({x2}, {y2}) é de {distancia:.2f}")