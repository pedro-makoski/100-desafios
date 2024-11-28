#include "stdio.h"

int strLength(char* string) {
    int count = 0;
    while(string[count] != '\0') {
        count++;
    }

    return count;
}

char* inverterString(char *string, int init, int length) {
    if(init < length) {
        char aux = string[init];
        string[init] = string[length];
        string[length] = aux;
        inverterString(string, init+1, length-1);
    }

    return;
}

void main() {
    char msg[100];
    printf("Informe um texto: ");
    gets(msg);
    int length = strLength(msg)-1;
    inverterString(&msg, 0, length);
    printf("%s", msg);
}
