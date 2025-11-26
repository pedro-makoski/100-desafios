#include "stdio.h"
#include "time.h"

char numero(int value) {
    switch(value) {
        case 0:
            return '0';
        case 1:
            return '1';
        case 2:
            return '2';
        case 3:
            return '3';
        case 4:
            return '4';
        case 5:
            return '5';
        case 6:
            return '6';
        case 7:
            return '7';
        case 8:
            return '8';
        case 9:
            return '9';
        case 10:
            return 'A';
        case 11:
            return 'B';
        case 12:
            return 'C';
        case 13:
            return 'D';
        case 14:
            return 'E';
        case 15:
            return 'F';
    }
}

void main()
{
    int color = 0;
    char value[8];
    value[0] = 'c';
    value[1] = 'o';
    value[2] = 'l';
    value[3] = 'o';
    value[4] = 'r';
    value[5] = ' ';
    char num, num2;
    printf("Ola mundo");

    for(color = 0; color < 16; color++) {
        num = numero(color);
        value[6] = num;
        num2 = numero(15-color);
        value[7] = num2;
        value[8] = '\0';
        value[9] = '\0';
        system(value);
        if(color == 15) {
            color = 0;
        }
    }
}

