#include "stdio.h"

char*** alocarMatrizString(int quantLinha, int quantColuna, int lenString) {
    char*** res = (char***)calloc(quantLinha, sizeof(char**));

    for(int i = 0; i < quantLinha; i++) {
        res[i] = (char**)calloc(quantColuna, sizeof(char*));
        for(int j = 0; j < quantColuna; j++) {
            res[i][j] = (char*)calloc(lenString, sizeof(char));
        }
    }

    return res;
}

int* quantColumnsAndRows(char* name) {
    FILE *input;
    input = fopen(name, "r");
    if(input == NULL) {
        return NULL;
    }

    int ret = 0;
    char value;
    int contLinhas = 1, contColunas = 1;

    while(ret != EOF) {
        ret = fscanf(input, "%c", &value);
        if(ret != EOF) {
             if(value == ',' && contLinhas == 1) {
                contColunas++;
             }

            if(value == '\n') {
               contLinhas++;
            }
        }
    }

    fclose(input);
    int* res = (int*)malloc(2 * sizeof(int));
    res[0] = contLinhas;
    res[1] = contColunas;
    return res;
}


char*** readCSV(char* name) {
    FILE *input;
    input = fopen(name, "r");
    if(input == NULL) {
        return NULL;
    }
    int *valoresLinhaColuna = quantColumnsAndRows(name), contLinhas = 0, contColunas = 0, contString = 0;
    char*** res = alocarMatrizString(valoresLinhaColuna[0], valoresLinhaColuna[1], 100);
    int ret = 0;
    char value;

    while(ret != EOF) {
        ret = fscanf(input, "%c", &value);
        if(ret != EOF) {
            if(value == ',') {
                contString=0;
                contColunas++;
                continue;
            }

            if(value == '\n') {
               contLinhas++;
               contColunas = 0;
               contString = 0;
               continue;
            }

            res[contLinhas][contColunas][contString] = value;
            contString++;
        }
    }

    fclose(input);
    return res;
}

int lenString(char* string) {
    int cont = 0;
    while(string[cont] != '\0') {
        cont++;
    }

    return cont;
}

int* majorLengthEachColum(char*** matriz, int linesLength, int columnLength) {
    int* res = (int*)calloc(columnLength, sizeof(int));
    int maior = 0;
    for(int i = 0; i < columnLength; i++) {
        maior = 0;
        for(int j = 0; j < linesLength; j++) {
            int len = lenString(matriz[j][i]);
            if(len > maior) {
                maior = len;
            }
        }

        res[i] = maior;
    }

    return res;
}

void repeatChar(char content, int length) {
    for(int i = 0; i < length; i++) {
        printf("%c", content);
    }
}

void visualize(char*** matriz, int linesLength, int columnLength) {
    int* valuesMajorEachColumn = majorLengthEachColum(matriz, linesLength, columnLength);

    for(int i = 0; i < linesLength; i++) {
        for(int j = 0; j < columnLength; j++) {
            repeatChar('-', valuesMajorEachColumn[j]+2);
        }
        printf("\n");

        for(int j = 0; j < columnLength; j++) {
            printf("| %s", matriz[i][j]);
            repeatChar(' ', valuesMajorEachColumn[j]-lenString(matriz[i][j]));
        }
        printf("|\n");
    }
}

void main() {
    printf("IMPORTANTE: o programa nao funciona com virgulas entre aspas e nem com acentos\nE cada coluna deve ter pelo menos um espaco, para que o programa funcione\n");

    char name[100];
    printf("Informe o nome do arquivo(insira tambem o .csv no final): ");
    gets(name);

    int *valueLinhaColuna = quantColumnsAndRows(name);

    if(valueLinhaColuna == NULL) {
        printf("Problemas na abertura do arquivo");
        return;
    }

    char ***res = readCSV(name);

    visualize(res, valueLinhaColuna[0], valueLinhaColuna[1]);

}
