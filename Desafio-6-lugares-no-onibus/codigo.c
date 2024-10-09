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
    int lugar;
    lugar = 0;
    printf("\n--------------------------------------------");
    mostrar_lugares();
    printf("42 - Nao desejo mais reservar\n");
    do{
        if(lugares[lugar] == 1) {
            printf("\nLugar ja reservado\n");
        }

        printf("Escolha o lugar: ");
        scanf("%d", &lugar);
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

    if(total_ocupados == 0) {
        printf("Nao ha nada a ver aqui\n");
    } else if(total_livres == 0) {
        printf("Nao ha nada a ver aqui\n");
    }

    if(show_result == 1) {
        printf("%d - Lugares ocupados\n", total_ocupados);
        printf("%d - Lugares Livres\n", total_livres);
    }
}

void main()
{
    int escolha;
    while(1) {
        do{
            printf("\n------------------------\n(1) - Reservar\n(2) - Ver lugares\n(3) - Quantidade de lugares ocupados e livres\n(4) - Lugares Ocupados\n(5) - Lugares Livres\n(6) - Sair\nEscolha um: ");
            scanf("%d", &escolha);
        } while(escolha < 1 || escolha > 6);

        if(escolha == 1){
            reservar();
        }else if(escolha == 2){
            mostrar_lugares();
        }else if(escolha == 3){
            quantidade(0, 1);
        }else if(escolha == 4){
            quantidade(2, 0);
        }else if(escolha == 5) {
            quantidade(1, 0);
        }else if(escolha == 6) {
            printf("\nClique em qualquer lugar para sair");
            return;
        }
    }
}
