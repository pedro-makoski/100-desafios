#include "stdio.h"
#define MAX_VALUE 100

char itens[MAX_VALUE][100];
int itens_length;
itens_length = 0;

int strlength(char valor[100]) {
    int total;
    total = 0;

    while(valor[total] != '\0') {
        total++;
    }

    return total;
}

void adicionar_lista(char value[100]) {
    if(itens_length == 100) {
        printf("\nNao e possivel prencher mais");
        return;
    }

    for(int i = 0; i <= strlength(value); i++) {
        itens[itens_length][i] = value[i];
    }

    itens_length++;
}

void mostrar_valores() {
    for(int i = 0; i < itens_length; i++) {
        printf("%s", itens[i]);
        if(i+1 == itens_length) {
            return;
        }

        printf(", ");
    }

    printf("----Nao ha valores aqui, tente adicionar----\n");
}

void search(char search_term[100]) {
    int length_correct, quant_apareceram;
    quant_apareceram = 0;

    for(int i = 0; i < itens_length; i++) {
        for(int j = 0; j < strlength(itens[i]); j++) {
            length_correct = 0;

            for(int k = 0; k < strlength(search_term); k++) {
                if(toupper(search_term[k]) == toupper(itens[i][j+k])) {
                    length_correct++;
                }
            }

            if(length_correct == strlength(search_term)) {
                printf("%s\n", itens[i]);
                j = strlen(itens[i])+1;
                quant_apareceram ++;
            }
        }
    }

    if(quant_apareceram == 0) {
        printf("Nenhum item relacionado\n");
    }
}

void main() {
    char continuar;
    int opcao;
    char valor[100];

    do{
        system("CLS");
        printf("\n----------------------------------------\n");
        do {
            printf("O que voce deseja fazer:\n(1) - Adicionar valor a lista\n(2) - Procurar item na lista\n(3) - Ver valores\nDiga: ");
            scanf("%d", &opcao);
        } while(opcao > 3 || opcao < 1);

        if(opcao == 1) {
            printf("Informe o que voce quer adicionar: ");
            fflush(stdin);
            gets(valor);
            adicionar_lista(valor);
        } else if(opcao == 2){
            printf("Faca sua pesquisa: ");
            fflush(stdin);
            gets(valor);
            search(valor);
        }else if(opcao == 3) {
            mostrar_valores();
        }

        printf("\nDeseja continuar S/N: ");
        fflush(stdin);
        scanf("%c", &continuar);
    } while(continuar == 's' || continuar == 'S');

    printf("\nClique em qualquer tecla para sair.");
    getche();
}
