#include "stdio.h"
#define TOTAL_COLUMN 7

int pedirValor(char *msg) {
    int value;
    printf("%s", msg);
    scanf("%d", &value);
    return value;
}

void main()
{
    float valorProcurado;
    valorProcurado = pedirValor("Informe um valor para ver se ele aparece: ");

    FILE *dados;
    dados = fopen("dados.txt", "r");
    if(dados == NULL) {
        printf("Problemas na abertura dos arquivos");
        return;
    }

    int ret = 0, value, contLinha = 0, contColuna = 0, lastLinha = -1, quant = 0;

    while(ret != EOF) {
        ret = fscanf(dados, "%d", &value);
        if(ret != EOF) {
            if(value == valorProcurado && lastLinha != contLinha && contColuna != 0) {
                lastLinha = contLinha;

                quant++;
            }
            contColuna++;
            if(contColuna == TOTAL_COLUMN) {
                contLinha++;
                contColuna = 0;
            }
        }
    }

    fclose(dados);

    printf("A quantidade eh de %d", quant);
}
