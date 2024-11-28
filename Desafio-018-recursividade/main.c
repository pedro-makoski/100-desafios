#include "stdio.h"

void imprimirQuant(int n, char* msg) {
    printf("%s", msg);

    if(n != 1) {
        imprimirQuant(n-1, msg);
    }
}

void main() {
    imprimirQuant(3, "Pedro Makoski\n");
}
