#include "stdio.h"

void main() {
    FILE *dados;
    dados = fopen("dados.txt", "r");
    if(dados == NULL) {
        printf("Ops deu algum erro");
        return;
    }

    int retorno = 0, valores[9999][7], contLinha = 0, contColuna = 0, value;

    while(retorno != EOF) {
        retorno = fscanf(dados, "%d", &value);
        if(value != EOF) {
            valores[contLinha][contColuna] = value;
            contColuna++;
            if(contColuna == 7) {
                contColuna = 0;
                contLinha++;
            }
        }
    }

    for(int linha = 0; linha < 9999; linha++) {
        for(int coluna = 0; coluna < 7; coluna ++) {
            printf("%04d ", valores[linha][coluna]);
        }

        printf("\n");
    }
}
