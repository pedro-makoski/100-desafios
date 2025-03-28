#include "stdio.h"

int lugares[42];

void todos_igual_a_0() {
    for(int i = 0; i <= 41; i++) {
        lugares[i] = 0;
    }
}

void mostrar_lugares(){
    for(int i = 0; i <= 41; i++) {
        printf("%d - ", i);
        if(lugares[i] == 1) {
            printf("Reservado");
        } else {
            printf("Livre");
        }
        printf("\n");
    }
}

void reservar() {
    int lugar, mais_de_uma_vez;
    lugar = 0;
    mais_de_uma_vez = 0;
    printf("\n--------------------------------------------\n");
    mostrar_lugares();
    printf("42 - Nao desejo mais reservar\n");
    do{
        if(lugares[lugar] == 1 && mais_de_uma_vez >= 1) {
            printf("\nLugar ja reservado\n");
        }

        printf("Escolha o lugar: ");
        scanf("%d", &lugar);
        mais_de_uma_vez++;
    } while(lugar > 42 || lugar < 0 || lugares[lugar] == 1);
    if(lugar == 42) {
        return;
    }

    lugares[lugar] = 1;
    printf("\nLugar registrado com sucesso");
}

void quantidade(int show_progress, int show_result) {// show_progress 0 nao mostra, 1 mostra lugares livres e 2 lugares reservados.
    int total_ocupados, total_livres;
    total_ocupados = 0;
    total_livres = 0;

    for(int i = 0; i<42; i++) {
        if(lugares[i] == 1) {
            total_ocupados++;
            if(show_progress==2) {
                printf("%d - Reservado\n", i);
            }
        } else {
            total_livres++;
            if(show_progress==1) {
                printf("%d - Livre\n", i);
            }
        }
    }

    if((total_ocupados == 0 || total_livres == 0) && show_result != 1) {
        printf("Nao ha nada a ver aqui\n");
    }

    if(show_result == 1) {
        printf("%d - Lugares ocupados\n", total_ocupados);
        printf("%d - Lugares Livres\n", total_livres);
    }
}

void main()
{
    char opcao;
    int escolha;
    todos_igual_a_0();
    do {
        system("CLS");

        do{
            printf("\n------------------------\n(1) - Reservar\n(2) - Ver lugares\n(3) - Quantidade de lugares ocupados e livres\n(4) - Lugares Ocupados\n(5) - Lugares Livres\n(6) - Esvaziar onibus\n(7) - Sair\nEscolha um: ");
            scanf("%d", &escolha);
        } while(escolha < 1 || escolha > 6);

        switch(escolha) {
            case 1:
                reservar();
                break;
            case 2:
                mostrar_lugares();
                break;
            case 3:
                quantidade(0, 1);
                break;
            case 4:
                quantidade(2, 0);
                break;
            case 5:
                quantidade(1, 0);
                break;
            case 6:
                todos_igual_a_0();
                break;
            case 7:
                return;
        }

        printf("\nDeseja Continuar S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 'S' || opcao == 's');

    return;
    getche();
}
