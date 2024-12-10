#include "stdio.h"
#include "math.h"

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

float calcFX(float a, float b, float c, float x) {
    float res = (a*(x*x))+(b*x)+c;
    return res;
}

void calcFxMultipleFile(float a, float b, float c, int quant, int start, FILE *file, float steps) {
    float valueY;
    float i;

    for(i = (float)start; i <= (float)quant; i+=steps) {
        valueY = calcFX(a, b, c, i);
        fprintf(file, "%.2f,%.2f\n", i, valueY);
    }
}

int stringLength(char* string) {
    int cont = 0;
    while(string[cont] != '\0') {
        cont++;
    }

    return cont;
}

int main()
{
    float a, b, c, steps;
    int start, end;
    char isContinue;
    char nomedoarquivo[100];
    int lengthnomearquivo = 0;

    do {
        system("cls");
        a = pedirValueFloat("Informe o valor de a: ");
        b = pedirValueFloat("Informe o valor de b: ");
        c = pedirValueFloat("Informe o valor de c: ");

        if(a == 0) {
            printf("Desculpe isso nao eh uma funcao quadratica");
        } else {
            FILE *valores;

            printf("Informe o nome do arquivo: ");
            fflush(stdin);
            gets(nomedoarquivo);
            lengthnomearquivo = stringLength(nomedoarquivo);
            nomedoarquivo[lengthnomearquivo] = '.';
            nomedoarquivo[lengthnomearquivo+1] = 'c';
            nomedoarquivo[lengthnomearquivo+2] = 's';
            nomedoarquivo[lengthnomearquivo+3] = 'v';

            valores = fopen(nomedoarquivo, "w");
            if(valores != NULL){
                start = pedirValueInt("Informe o valor inicial: ");
                end = pedirValueInt("Informe o valor final: ");
                steps = pedirValueInt("Informe o acrescimo de valor para valor no grafico: ");

                calcFxMultipleFile(a, b, c, end, start, valores, steps);
                fclose(valores);
            } else {
                printf("\nOps deu um erro!");
            }
        }


        printf("\nDeseja continuar com outros valores S/N: ");
        fflush(stdin);
        scanf("%c", &isContinue);
    } while(isContinue == 'S' || isContinue == 's');

    return 0;
}




