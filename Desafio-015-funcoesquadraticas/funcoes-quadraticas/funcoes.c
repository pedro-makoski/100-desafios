#include "stdio.h"
#include "math.h"
#include "funcoes.h"

float calcDelta(float a, float b, float c) {
    float res = (b*b)-(4*a*c);
    return res;
}

float calcRaiz(float a, float  b, float delta, char signal) {
    float res;
    if(signal == '+') {
        res = ((-1*b)+(sqrt(delta)))/(2*a);
    } else {
        res = ((-1*b)-(sqrt(delta)))/(2*a);
    }

    return res;
}

int calcQuantRaizes(float delta) {
    if(delta > 0) {
        return 2;
    } else if(delta == 0) {
        return 1;
    } else {
        return 0;
    }
}

float calcVerticeX(float b, float a) {
    float res = (-1*b)/(2*a);
    return res;
}

float calcVerticeY(float delta, float a) {
    float res = (-1*delta)/(4*a);
    return res;
}

float pedirValueFloat(char* msg) {
    float valor;
    printf("%s", msg);
    scanf("%f", &valor);
    return valor;
}

int pedirValueInt(char* msg) {
    int valor;
    printf("%s", msg);
    scanf("%d", &valor);
    return valor;
}

float mostrarRaizes(float a, float b, float delta) {
    int quantRaizes = calcQuantRaizes(delta);
    float x1, x2;
    x1 = calcRaiz(a, b, delta, '+');
    x2 = calcRaiz(a, b, delta, '-');
    if(quantRaizes == 0) {
        printf("\nNao existe raiz para esse delta");
    } else if(quantRaizes == 1){
        printf("\nExiste apenas uma raiz: %.2f", x1);
    } else {
        printf("\nExiste duas raizes X1: %.2f, X2: %.2f", x1, x2);
    }
}

float calcFX(float a, float b, float c, float x) {
    float res = (a*(x*x))+(b*x)+c;
    return res;
}

void calcFxMultiple(float a, float b, float c, int quant, int start) {
    float valueY;

    printf("\n|x\t|\ty\t\t|");
    printf("\n---------------------------------------");

    for(int i = start; i <= quant; i++) {
        valueY = calcFX(a, b, c, i);
        printf("\n|%d\t|\t%.2f\t|", i, valueY);
    }
}



