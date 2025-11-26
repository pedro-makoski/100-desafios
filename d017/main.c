#include "stdio.h"

void optionShows(int *opt) {
    do {
        system("CLS");
        printf("Entradas em:\n");
        printf("[1] - Segundos\n");
        printf("[2] - Minutos\n");
        printf("[3] - Horas\n");
        printf("[4] - Dias\n");
        printf("Diga: ");
        scanf("%d", opt);
    } while(*opt < 1 || *opt > 4);
}

void calcTempo(float secondsTotais, float *horas, float *minutos, float *segundos, float *dias)
{
    int resto;
    *dias = (int)(secondsTotais/86400);
    resto = (int)secondsTotais%86400;
    *horas = resto/3600;
    resto = resto%3600;
    *minutos = resto/60;
    resto = resto%60;
    *segundos = (float)resto;
}

float convert(int inputType, float value) {
    switch(inputType) {
        case 1:
            return value;
        case 2:
            return value*60;
        case 3:
            return value*3600;
        case 4:
            return value*86400;
    }
}

void askFloat(char* msg, float *var) {
    printf("%s", msg);
    scanf("%f", var);
}

void main() {
    char opcao;
    do {
        int opt;
        float horas, minutos, segundos, dias, totais;
        optionShows(&opt);
        askFloat("Informe o tempo total: ", &totais);

        totais = convert(opt, totais);
        calcTempo(totais, &horas, &minutos, &segundos, &dias);
        printf("%02.0f:%02.0f:%02.0f:%02.0f", dias, horas, minutos, segundos);

        printf("\nDeseja fazer outro S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 'S' || opcao == 's');
}
