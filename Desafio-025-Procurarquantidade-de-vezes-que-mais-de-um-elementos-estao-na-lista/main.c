#include "stdio.h"
#define TOTAL_COLUMN 7

int pedirValor(char *msg) {
    int value;
    printf("%s", msg);
    scanf("%d", &value);
    return value;
}

void pedirVariosValores(int *lista, int quant) {
    for(int i = 0; i < quant; i++) {
        lista[i] = pedirValor("Informe um valor: ");
    }
}

void resetarLista(int valorInicial, int* lista, int length) {
    for(int i = 0; i < length; i++) {
        lista[i] = valorInicial;
    }
}

void main()
{
    int quant;
    printf("Insira a quantidade de elementos: ");
    scanf("%d", &quant);
    if(quant > TOTAL_COLUMN) {
        printf("\nO valor nao pode ser maior que %d, valor automaticamente mudado para o mesmo\n", TOTAL_COLUMN);
        quant = TOTAL_COLUMN;
    }
    int valoresProcurado[quant];
    pedirVariosValores(&valoresProcurado, quant);

    FILE *dados;
    dados = fopen("dados.txt", "r");
    if(dados == NULL) {
        printf("\nProblemas na abertura dos arquivos");
        return;
    }

    int ret = 0, value, contLinha = 0, contColuna = 0, lastLinha = -1, quantVerified = 0, valoresDaLinha[TOTAL_COLUMN], correspondentesLinha = 0, correspondentesValoresVerify[quant];
    resetarLista(0, &correspondentesValoresVerify, quant);


    while(ret != EOF) {
        ret = fscanf(dados, "%d", &value);
        if(ret != EOF) {
            valoresDaLinha[contColuna] = value;

            contColuna++;
            if(contColuna == TOTAL_COLUMN) {
                for(int i = 1; i < TOTAL_COLUMN; i++) {
                    for(int j = 0; j < quant; j++) {
                        if(valoresDaLinha[i] == valoresProcurado[j] && correspondentesValoresVerify[j] != 1 && contColuna != 0) {
                            correspondentesValoresVerify[j] = 1;
                            correspondentesLinha++;
                        }
                    }
                }

                if(correspondentesLinha == quant) {
                    quantVerified++;
                }

                correspondentesLinha = 0;
                resetarLista(0, &correspondentesValoresVerify, quant);
                contLinha++;
                contColuna = 0;
            }
        }
    }

    fclose(dados);

    printf("A quantidade eh de %d", quantVerified);
}
