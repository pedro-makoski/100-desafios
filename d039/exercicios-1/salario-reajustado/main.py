TAXA_DE_AUMENTO = 10
TAXA_DE_AUMENTO_PERCENT = TAXA_DE_AUMENTO/100
salario = float(input("Digite seu salário: "))
newSalario = (salario*TAXA_DE_AUMENTO_PERCENT)+salario
print(f"Seu novo salário é de {newSalario:.2f}")