#include "stdio.h"
#define MAX_PRODUCT 101

char produto[MAX_PRODUCT][50] = {};
int products_length = 0;
float produto_preco_a_quant[MAX_PRODUCT] = {};
int produto_quant_stock[MAX_PRODUCT] = {};
int produto_type[MAX_PRODUCT] = {}; // 0 e a quilo e 1 e a unidade

int strlength(char valor[100]) {
    int total;
    total = 0;

    while(valor[total] != '\0') {
        total++;
    }

    return total;
}

void cadastrar_produto()
{
    if(products_length >= MAX_PRODUCT) {
        printf("\nLimite de items possiveis ultrapassado");
        return;
    }

    char nome[40], valido_tipo;
    float preco;
    int quant, type;
    printf("---------------------------------");
    printf("\nInforme o nome: ");
    fflush(stdin);
    gets(nome);
    for(int i = 0; i < strlength(nome); i++) {
        produto[products_length][i] = nome[i];
    }

    do{
        printf("\nO tipo do produto pode ser: \n1 - o quilo \n2 - a unidade.\nagora informe  tipo: ");
        scanf("%d", &type);
        fflush(stdin);
    } while(type != 1 && type != 2);

    produto_type[products_length] = type;

    do {
        printf("\nInforme o preco d");
        if(type == 1) {
            printf("o quilo");
        } else {
            printf("a unidade");
        }

        printf(" R$ ");

        scanf("%f", &preco);
        fflush(stdin);
    } while(preco < 0);

    produto_preco_a_quant[products_length] = preco;

    do{
        printf("\nInforme a quantidade de");
        if(type == 1) {
            printf(" kilos");
        } else {
            printf(" unidades");
        }
        printf(" em Stock: ");
        scanf("%d", &quant);
        fflush(stdin);
    } while(quant < 0);

    produto_quant_stock[products_length] = quant;

    products_length++;
}

void ver_produtos()
{
    printf("-----------------------------\n");
      for(int i = 1; i <= products_length; i++) {
        printf("%d - %s\n", i, produto[i-1]);
      }
}

void alterar_produto() {
    int valor_que_deseja_alterar, oquealterar;
    printf("\nQual voce deseja alterar?\n");

    do {
      ver_produtos();
      printf("\nInforme o valor do item que voce deseja alterar: ");
      scanf("%d", &valor_que_deseja_alterar);
    } while(valor_que_deseja_alterar > products_length || valor_que_deseja_alterar < 1);

    valor_que_deseja_alterar--;

    char nome[40], valido_tipo, opcaocontinuar;
    float preco;
    int quant, type;

    do {
        printf("\nNome:%s\nQuantidade de", produto[valor_que_deseja_alterar]);
        if(produto_type[valor_que_deseja_alterar] == 1) {
            printf(" kilos");
        } else {
            printf(" unidades");
        }

        printf("(tipo: %d) em stock: %d\nPreco: %.2f\n", produto_type[valor_que_deseja_alterar], produto_quant_stock[valor_que_deseja_alterar], produto_preco_a_quant[valor_que_deseja_alterar]);

        do {
            printf("\nOpcoes:\n1 - Nome\n2 - Tipo\n3 - Preco\n4 - quantidade em stock\n5 - Cancelar\nO que voce deseja alterar: ");
            scanf("%d", &oquealterar);
            fflush(stdin);
        } while(oquealterar > 5 || oquealterar < 1);

        printf("---------------------------------\n");
        if(oquealterar == 1) {
            printf("\nInforme o nome: ");
            fflush(stdin);
            gets(nome);
            for(int i = 0; i < strlength(nome); i++) {
                produto[valor_que_deseja_alterar][i] = nome[i];
            }
        }

        if(oquealterar == 2) {
            do{
                printf("\nO tipo do produto pode ser: \n1 - o quilo \n2 - a unidade.\nagora informe  tipo: ");
                scanf("%d", &type);
                fflush(stdin);
            } while(type != 1 && type != 2);

            produto_type[valor_que_deseja_alterar] = type;
        }

        if(oquealterar == 3) {
            do {
                printf("\nInforme o preco d");
                if(produto_type[valor_que_deseja_alterar] == 1) {
                    printf("o quilo");
                } else {
                    printf("a unidade");
                }

                printf(" R$ ");

                scanf("%f", &preco);
                fflush(stdin);
            } while(preco < 0);

            produto_preco_a_quant[valor_que_deseja_alterar] = preco;
        }

        if(oquealterar == 4) {
            do{
                printf("\nInforme a quantidade d");
                if(produto_type[valor_que_deseja_alterar] == 1) {
                    printf("e kilos");
                } else {
                    printf("e unidades");
                }

                printf(" em Stock: ");
                scanf("%d", &quant);
                fflush(stdin);
            } while(quant < 0);

            produto_quant_stock[valor_que_deseja_alterar] = quant;
        }

        if(oquealterar == 5) {
            break;
        }

        printf("\nQuer alterar outra coisa S/N: ");
        fflush(stdin);
        scanf("%c", &opcaocontinuar);

    } while(opcaocontinuar == 'S' || opcaocontinuar == 's');

}

void remover_item(int pos) //pos comeca em 0
{
    for(int i = pos+1; i < products_length; i++) {
        for(int j = 0; j < strlength(produto[i-1]); j++) {
            produto[i-1][j] = produto[i][j];
        }

        produto_preco_a_quant[i-1] = produto_preco_a_quant[i];
        produto_quant_stock[i-1] = produto_quant_stock[i];
        produto_type[i-1] = produto_type[i];
    }

    for(int i = 0; i <= strlength(produto[products_length-1]); i++){
        produto[products_length-1][i] = 0;
    }

    produto_preco_a_quant[products_length-1] = 0;
    produto_quant_stock[products_length-1] = 0;
    produto_type[products_length-1] = 0;
    products_length--;

}

void comprar() {
    int oquecomprar, quant, produtos_index[MAX_PRODUCT] = {}, quants[MAX_PRODUCT] = {}, index;
    index = 0;
    float total;
    total = 0;
    char opcao;
    do {
        do {
            ver_produtos();
            printf("\nO que deseja comprar: ");
            scanf("%d", &oquecomprar);
        } while(oquecomprar < 1 || oquecomprar > products_length);
        if(produto_quant_stock[oquecomprar-1] != 0) {
                if(produto_type[oquecomprar-1] == 1) {
                    printf("Quantos kilos: ");
                } else {
                    printf("Quantas unidades: ");
                }

                scanf("%d", &quant);
                if(produto_quant_stock[oquecomprar-1] >= quant) {
                    produtos_index[index] = oquecomprar-1;
                    total += produto_preco_a_quant[oquecomprar-1]*quant;
                    produto_quant_stock[oquecomprar-1] = produto_quant_stock[oquecomprar-1] - quant;
                    quants[index] = quant;
                    index++;
                } else {
                    printf("Quantidade fora de estoque\n");
                }

        } else {
            printf("Item fora de estoque\n");
        }

        printf("Deseja comprar mais um produto S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 'S' || opcao == 's');

    float total_product;
    int idx;

    for(int i = 0; i < index; i++) {
        idx = produtos_index[i];
        total_product = produto_preco_a_quant[idx]*quants[i];
        printf("\n%d - %s - %d - %.2f - %.2f\n", i, produto[idx], quants[i], total_product, produto_preco_a_quant[idx]);
    }

    printf("Voce precisa pagar %.2f\n", total);
}

void main()
{
    char opcao;
    int oqueelequer, valor_remover;

    do{
        system("CLS");
        printf("\n------------------------------");
        do{
            printf("\nO que fazer:\n(1) - Cadastrar produto\n(2) - Alterar produto\n(3) - Remover produto\n(4) - Comprar\n(5) - Mostrar produtos\nDiga: ");
            fflush(stdin);
            scanf("%d", &oqueelequer);
        } while(oqueelequer < 1 || oqueelequer > 5);

        if(oqueelequer == 1) {
            cadastrar_produto();
        } else {
            if(products_length > 0) {
                if(oqueelequer == 2) {
                    alterar_produto();
                } else if(oqueelequer == 3) {
                    ver_produtos();
                    do {
                        printf("Qual voce que remover: ");
                        scanf("%d", &valor_remover);
                    } while(valor_remover < 0 || valor_remover > products_length);

                    remover_item(valor_remover-1);
                } else if(oqueelequer == 4){
                    comprar();
                } else {
                    ver_produtos();
                }
            } else {
                printf("\nSem produtos nao tem como trabalhar com eles, cadastre um produto e tente novamente.");
            }
        }
        printf("\nDeseja fazer outra acao S/N: ");
        fflush(stdin);
        scanf("%c", &opcao);
    } while(opcao == 's' || opcao == 'S');

    printf("\nClique em qualquer tecla para sair");
    getche();
}
