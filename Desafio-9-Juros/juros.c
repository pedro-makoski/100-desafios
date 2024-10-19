#include "stdio.h"
#include "math.h"

float juros_compostos(float taxa, float capital_inicial, float periodo) {
    float res;
    res = capital_inicial*(pow((1+(taxa/100)), periodo));
    return res;
}

float juros_simples(float taxa, float capital_inicial, float periodo) {
    float res;
    res = (taxa/100)*capital_inicial*periodo;
    return res;
}

void main() {
    char opcao;
    float taxa, capital_inicial, periodo, res;
    int escolha;

    do {
        system("CLS");
        do {
            printf("Calculadora de Juros: \n(1) - Juros Simples\n(2) - Juros Compostos\nDiga: ");
            scanf("%d", &escolha);
        } while(escolha > 2 || escolha < 1);

        printf("Informe o Capital Inicial: ");
        scanf("%f", &capital_inicial);
        printf("Informe a taxa por unidade de periodo: ");
        scanf("%f", &taxa);
        printf("Informe o periodo determinado: ");
        scanf("%f", &periodo);

        switch(escolha) {
            case 1:
                res = juros_simples(taxa, capital_inicial, periodo);
                printf("\nO juros eh R$ %.2f\n", res);
                printf("O montante seria de R$ %.2f\n", res+capital_inicial);
                break;
            case 2:
                res = juros_compostos(taxa, capital_inicial, periodo);
                printf("O valor de Juros eh de R$ %.2f\n", res-capital_inicial);
                printf("O montante seria de R$ %.2f\n", res);
                break;
        }

        printf("Deseja Continuar S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 'S' || opcao == 's');
}
