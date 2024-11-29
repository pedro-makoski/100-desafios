#include "stdio.h"

void timeConverter(int secondsTotais, int *dias, int *horas, int *minutos, int *segundos) {
    *horas = 0;
    int temp = secondsTotais/60;
    *segundos = secondsTotais%60;
    *minutos = temp%60;
    *horas = temp/60;
    if(*horas >= 24) {
        *dias = *horas/24;
        *horas -= (*dias*24);
    }
}

void main() {
    int secondsTotais, dias, horas, minutos, segundos;
    printf("Informe a quantidade de segundos totais: ");
    scanf("%d", &secondsTotais);
    timeConverter(secondsTotais, &dias, &horas, &minutos, &segundos);
    if(dias != 0) {
        printf("Dias: %02d\n", dias);
    }

    printf("%02d:%02d:%02d", horas, minutos, segundos);

}
