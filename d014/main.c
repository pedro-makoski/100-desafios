#include "stdio.h"

void cabecalho() {
    system("CLS");
    printf("\n+----------------------------+");
    printf("\n|Pedro Makoski               |");
    printf("\n+----------------------------+\n");
}

void rodape() {
    printf("\n+----------------------------+");
    printf("\n|11/11/2024                  |");
    printf("\n+----------------------------+\n");
}

float soma(float v1, float v2) {
    float res = v1+v2;
    return res;
}

float subtracao(float v1, float v2) {
    float res = v1-v2;
    return res;
}


float divisao(float v1, float v2) {
    float res = v1/v2;
    return res;
}


float multiplicacao(float v1, float v2) {
    float res = v1*v2;
    return res;
}

float calc(float n1, float n2, char signal) {
    float res;

    switch(signal) {
        case '+':
            res = soma(n1, n2);
            break;
        case '-':
            res = subtracao(n1, n2);
            break;
        case '*':
            res = multiplicacao(n1, n2);
            break;
        case '/':
            res = divisao(n1, n2);
            break;
    }

    return res;
}

float input_numero(char* msg) {
    float valor;
    printf("%s", msg);
    scanf("%f", &valor);
    return valor;
}

char input_char(char* msg) {
    char valor;
    printf("%s", msg);
    fflush(stdin);
    scanf("%c", &valor);
    return valor;
}

void main() {
    float v1, v2, result;
    char signal, opcao;

    do {
        cabecalho();

        v1 = input_numero("Informe o numero: ");
        v2 = input_numero("Informe o outro numero: ");
        signal = input_char("Informe o sinal: ");

        result = calc(v1, v2, signal);
        printf("%.2f", result);

        rodape();

        printf("Deseja continua S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 'S' || opcao == 's');
}

