#include "stdio.h"
#include "stdbool.h"
#include "math.h"
#define TAMANHO_MAXIMO_DO_NUMERO 100
#define QUANTIDADE_ALGARISMOS 36

char algarismos_possiveis[36] = "0123456789abcdefghijklmnopqrstuvwxyz";

int lengthstr(char valor[TAMANHO_MAXIMO_DO_NUMERO]) {
    int quantidade = 0;
    while(valor[quantidade] != '\0') {
        quantidade++;
    }

    return quantidade;
}

bool iscompativel(char valor[TAMANHO_MAXIMO_DO_NUMERO], int base_atual) {
    char valor_minusculo[TAMANHO_MAXIMO_DO_NUMERO];
    int quantidade = lengthstr(valor), i, quantidade_nao_iguais;
    char valor_base[base_atual];

    for(i = 0; i < quantidade; i++) {
        valor_minusculo[i] = tolower(valor[i]);
    }

    for(int i = 0; i < base_atual; i++) {
        valor_base[i] = algarismos_possiveis[i];
    }

    for(i = 0; i < quantidade; i++) {
        quantidade_nao_iguais = 0;
        for(int j = 0; j < base_atual; j++) {
            if(valor_base[j] != valor_minusculo[i]) {
                quantidade_nao_iguais++;
            }
        }

        if(quantidade_nao_iguais == base_atual) {
            return false;
        }
    }
}

int valor_algarismo(valor) {
    for(int i = 0; i <= QUANTIDADE_ALGARISMOS; i++) {
        if(algarismos_possiveis[i] == valor) {
            return i;
        }
    }
}

int string_para_valor(char valor[TAMANHO_MAXIMO_DO_NUMERO]) {
    int length = lengthstr(valor), res = 0, atual_value;

    for(int i = 0; i < length; i++) {
        atual_value = valor_algarismo(valor[i]);
        res += atual_value*(pow(10, (length-i-1)));
    }

    return res;
}

void decimal_para_any(int base_atual, int base_a_converter, char valor[TAMANHO_MAXIMO_DO_NUMERO]) {
    int divisao = string_para_valor(valor), resto, i = 0, valores_binarios[TAMANHO_MAXIMO_DO_NUMERO];

    while(divisao >= base_a_converter) {
        resto = divisao%base_a_converter;
        divisao = divisao/base_a_converter;

        valores_binarios[i] = resto;
        i++;
    }

    valores_binarios[i] = divisao;

    for(i = i; i >= 0; i--) {
        printf("%c", algarismos_possiveis[valores_binarios[i]]);
    }
}

void any_para_decimal(int base_atual, int base_a_converter, char valor[TAMANHO_MAXIMO_DO_NUMERO]) {
    int length = lengthstr(valor), res = 0, potencia = length-1, valor_atual;

    for(int i = 0; i < length; i++) {
        valor_atual = valor_algarismo(tolower(valor[i]));
        res += pow(base_atual, potencia)*valor_atual;
        potencia--;
    }

    printf("%d", res);
}

void binario_para_any_exceto_decimal(int base_atual, int base_a_converter, char valor[TAMANHO_MAXIMO_DO_NUMERO]) {
    return;
}

void any_menos_decimal_exceto_binario(int base_atual, int base_a_converter, char valor[TAMANHO_MAXIMO_DO_NUMERO]) {
    return;
}

void main() {
    int base_atual, base_a_converter, res_inicial;
    char valor[TAMANHO_MAXIMO_DO_NUMERO];
    bool compativel = true;

    do {
        printf("Qual e a base do valor, que voce vai digitar\n(2) - Binario\n(8) - Octal\n(10) - Decimal\n(16) - Hexadecimal\nDiga: ");
        scanf("%d", &base_atual);
        printf("Qual e a base do valor, que voce quer obter\n(2) - Binario\n(8) - Octal\n(10) - Decimal\n(16) - Hexadecimal\nDiga: ");
        scanf("%d", &base_a_converter);
    } while(base_a_converter > 36 || base_atual > 36);

    do {
        printf("Qual e o valor atual: ");
        fflush(stdin);
        gets(valor);

        compativel = !iscompativel(valor, base_atual);
    } while(compativel);


    switch(base_atual) {
        case 10:
            decimal_para_any(base_atual, base_a_converter, valor);
            return;
        case 2:
            binario_para_any_exceto_decimal(base_atual, base_a_converter, valor);
            return;
    }

    switch(base_a_converter) {
        case 10:
            any_para_decimal(base_atual, base_a_converter, valor);
            return;
        case 2:
            any_menos_decimal_exceto_binario(base_atual, base_a_converter, valor);
            return;
    }
}
