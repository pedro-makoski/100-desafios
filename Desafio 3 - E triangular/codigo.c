#include "stdio.h"

int etriangular(int value)
{
    int soma;
    soma = 0;
    for(int i = 1; i <= value; i++) {
        soma = i + soma;
        if(value == soma) {
            return i;
        }
    }

    return 0;
}

void mostrarvisualizacao(int valor) {
    int i, j;

    for(i = 1; i <= valor; i++) {
        for(j = 1; j <= valor - i; j++) {
            printf(" ");
        }

        for(j = 1; j<=i; j++) {
            printf("()");
        }
        printf("\n");
    }
}

void main()
{
    int valor, res;
    char opcao, continuar;

    do {
        system("CLS");

        printf("Informe um valor para vermos se ele e triangular: ");
        scanf("%d", &valor);

        res = etriangular(valor);
        if(res == 0) {
            printf("Nao e triangular\n");
            printf("\nDeseja tentar outro numero S/N: ");
            fflush(stdin);
            scanf("%c", &continuar);
            continue;
        }

        printf("Valor Triangular");

        printf("\nDeseja ver o triangulo S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);

        if(opcao == 'S' || opcao == 's') {
            mostrarvisualizacao(res);
        }

        printf("\nDeseja tentar outro numero S/N: ");
        fflush(stdin);
        scanf("%c", &continuar);
    } while(continuar == 's' || continuar == 'S');

    printf("\nClique em qualquer tecla para sair");
    getche();
}
