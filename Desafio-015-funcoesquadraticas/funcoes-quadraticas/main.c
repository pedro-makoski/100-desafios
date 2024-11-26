#include "stdio.h"
#include "stdlib.h"
#include "funcoes.h"

void mostrarOpcoes(int *opcao) {
    system("cls");
    int opcaoFunc;
    printf("\n[1] - Descubra o delta");
    printf("\n[2] - Descubra as raizes");
    printf("\n[3] - Descubra a posicao do vertice");
    printf("\n[4] - Descubrar a partir do x o valor de y");
    printf("\n[5] - Tabela de valores x e y");
    printf("\nDiga: ");
    scanf("%d", &opcaoFunc);
    *opcao = opcaoFunc;
}

void caseWitch(int opcao, float a, float b, float c) {
    float delta, x1, x2, verticeX, verticeY, x, fx;
    int quant, start;
    delta = calcDelta(a, b, c);

    switch(opcao) {
        case 1:
            printf("\nO delta eh %.2f", delta);
            break;
        case 2:
            printf("\nO delta eh %.2f", delta);
            mostrarRaizes(a, b, delta);
            break;
        case 3:
            verticeX = calcVerticeX(b, a);
            verticeY = calcVerticeY(delta, a);
            printf("A posicao eh: (%.2f, %.2f)", verticeX, verticeY);
            break;
        case 4:
            x = pedirValueFloat("Informe o valor de x: ");
            fx = calcFX(a, b, c, x);
            printf("Se o x eh %.2f o y seria de %.2f", x, fx);
            break;
        case 5:
            quant = pedirValueInt("Informe o valor final da tabela: ");
            start = pedirValueInt("Informe o valor inicial da tabela: ");
            calcFxMultiple(a, b, c, quant, start);
            break;
    }
}

int main()
{
    float a, b, c;
    int opcao;
    char isContinue, otherOption;

    do {
        system("cls");
        a = pedirValueFloat("Informe o valor de a: ");
        b = pedirValueFloat("Informe o valor de b: ");
        c = pedirValueFloat("Informe o valor de c: ");

        if(a == 0) {
            printf("Desculpe isso nao eh uma funcao quadratica");
        } else {
            do {
                do {
                    mostrarOpcoes(&opcao);
                } while(opcao > 5 || opcao < 1);
                caseWitch(opcao, a, b, c);

                printf("\nDeseja fazer outra operacao com seu a, b e c S/N: ");
                fflush(stdin);
                scanf("%c", &otherOption);
            } while(otherOption == 'S' || otherOption == 's');
        }


        printf("\nDeseja continuar com outros valores S/N: ");
        fflush(stdin);
        scanf("%c", &isContinue);
    } while(isContinue == 'S' || isContinue == 's');

    return 0;
}
