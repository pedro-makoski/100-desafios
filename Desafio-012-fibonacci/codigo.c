#include "stdio.h"

int* sequencia(int quant) {
    int* sequencia_list = (int*)calloc(quant, sizeof(int));
    int cont, x1=0, x2=1, aux;

    for(cont = 0; cont < quant; cont++) {
        sequencia_list[cont] = x2;
        aux = x1;
        x1 = x2;
        x2 = aux+x2;
    }

    return sequencia_list;
}

void main()
{
    int quantidade;
    char opcao;

    do {
        system("CLS");
        printf("Quantos itens da sequencia do fibonacci voce quer ver: ");
        scanf("%d", &quantidade);

        if(quantidade > 46) {
            printf("O numero dessa posicao e muito grande para o programa poder rodar\n");
        } else {
            int *resultados = sequencia(quantidade);

            for(int i = 0; i < quantidade; i++) {
                printf("%d\n", resultados[i]);
            }
        }

        printf("Deseja continua S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 'S' || opcao == 's');
}
