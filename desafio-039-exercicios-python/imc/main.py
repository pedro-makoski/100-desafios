def main():
    peso = float(input("Digite seu peso: "))
    altura = float(input("Digite sua altura: "))

    imc = peso/(altura**2)
    print(f"Seu IMC é {imc:.2f}")

if __name__ == "__main__":
    main()