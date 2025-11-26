#include "stdio.h"

float pedirValueFloat(char* msg) {
    float value;
    printf("%s", msg);
    scanf("%f", &value);
    return value;
}

void calcTempo(float secondsTotais, float *horas, float *minutos, float *segundos, float *dias)
{
    int resto;
    *dias = (int)secondsTotais/86400;
    resto = (int)secondsTotais%86400;
    *horas = resto/3600;
    resto = resto%3600;
    *minutos = resto/60;
    resto = resto%60;
    *segundos = (float)resto;
}

void main() {
    float secondsTotais, horas, minutos, segundos, dias;

    secondsTotais = pedirValueFloat("Informe a quantidade de segundos: ");
    calcTempo(secondsTotais, &horas, &minutos, &segundos, &dias);
    printf("%02.0f:%02.0f:%02.0f:%02.0f", dias, horas, minutos, segundos);
}


