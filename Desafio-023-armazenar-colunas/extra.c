#include "stdio.h"

void main() {
    FILE *dados;
    dados = fopen("dados.txt", "r");
    if(dados == NULL) {
        printf("Ops deu algum erro");
        return;
    }

    int retorno = 0, contLinha = 0, value, contColuna = 0, value1, value2, value3, value4, value5, value6, value7;

    while(retorno != EOF) {
        retorno = fscanf(dados, "%d", &value);
        if(value != EOF) {
            switch(contColuna) {
                case 0:
                    value1 = value;
                    break;
                case 1:
                    value2 = value;
                    break;
                case 2:
                    value3 = value;
                    break;
                case 3:
                    value4 = value;
                    break;
                case 4:
                    value5 = value;
                    break;
                case 5:
                    value6 = value;
                    break;
                case 6:
                    value7 = value;
                    break;
            }
            contColuna++;
            if(contColuna == 7) {
                printf("%04d %04d %04d %04d %04d %04d %04d\n", value1, value2, value3, value4, value5, value6, value7);
                contColuna = 0;
                contLinha++;
            }
        }
    }
}

