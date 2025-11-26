#include "stdio.h"
#include "math.h"

char valores[] = "0123456789";

int quantidade_de_algarismos_numero(int numero) {
    int length = 1;
    float divisao;
    divisao = numero;
    while(divisao > 1) {
        divisao = divisao/pow(10, length);
        length++;
    }

    return length;

}

char* numero_para_string(int numero) {
    char* res;
    int valor_length = quantidade_de_algarismos_numero(numero), potencia;
    res = (char*)calloc(valor_length, sizeof(char));
    int valor_atual = numero;

    for(int i = valor_length-1; i >= 0; i--) {
        potencia = pow(10, i);
        int idx = valor_atual/potencia;
        res[valor_length-i-1] = valores[idx];
        valor_atual = valor_atual%potencia;
    }

    return res;
}

void main() {
    int valor;

    printf("Informe o valor para transformamos em string: ");
    scanf("%d", &valor);

    int valor_length = quantidade_de_algarismos_numero(valor);
    char res[valor_length];
    strcpy(res, numero_para_string(valor));

    printf("%s", res);
}
