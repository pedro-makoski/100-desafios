#include "stdio.h"
#include "math.h"

char valores[] = "0123456789";

int float_perde_casas_decimais(double numero) {
    int numero_int = (int)numero, quant = 0;
    double numero_float = (double)numero;
    double dif = numero_float-numero_int;

    while(fabs(dif) > 0.000001) {
        numero_float = numero_float*10;
        numero_int = (int)numero_float;
        dif = numero_float-numero_int;
        quant++;
    }

    return quant;
}

int quantidade_de_algarismos_numero(double numero) {
    int length = 0;
    double divisao;
    divisao = numero*pow(10, float_perde_casas_decimais(numero));
    while(divisao > 1) {
        divisao = divisao/10;
        length++;
    }

    return length;

}

char* numero_para_string(double numero) {
    char* res;
    char* rescomvirgula;
    char aux;
    int quant_casa_decimal = float_perde_casas_decimais(numero);
    int valor_length = quantidade_de_algarismos_numero(numero), potencia;
    res = (char*)calloc(valor_length, sizeof(char));
    rescomvirgula = (char*)calloc(valor_length+1, sizeof(char));
    int valor_atual = numero*pow(10, quant_casa_decimal);

    for(int i = valor_length-1; i >= 0; i--) {
        potencia = pow(10, i);
        int idx = valor_atual/potencia;
        res[valor_length-i-1] = valores[idx];
        valor_atual = valor_atual%potencia;
    }

    if(quant_casa_decimal > 0) {
        int pos_virgula = valor_length-quant_casa_decimal;
        for(int i = 0; i <= valor_length; i++) {
            if(i < pos_virgula) {
                rescomvirgula[i] = res[i];
            } else if(i == pos_virgula) {
                rescomvirgula[i] = ',';
            } else {
                rescomvirgula[i] = res[i-1];
            }
        }

        return rescomvirgula;
    }


    return res;
}

void main() {
    double valor;

    printf("Informe o valor para transformamos em string: ");
    scanf("%lf", &valor);

    int valor_length = quantidade_de_algarismos_numero(valor);
    char res[valor_length+1];

    strcpy(res, numero_para_string(valor));

    printf("%s", res);
}

