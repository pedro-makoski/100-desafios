const SUBTRACTION_SIMBOL = "-"

class Calculadora {
    expression: string;
    resultado: number;

    constructor(expression: string) {
        this.expression = expression.replace(/\s+/g, '').replace(/,/g, '.');
        this.resultado = 0;
    }

    thisExpressionIsCorrect() {
        if(this.expression.length === 0) {
            throw new Error("Valor vazio")
        }

        const errorPattern = /(\d*\.){2,}/g;
        const errorMatches = Array.from(this.expression.matchAll(errorPattern));
        const outroErroPattern = /([\*\/\-\+\^]{2,})/g; 
        const errorMatchesDoOutro = Array .from(this.expression.matchAll(outroErroPattern));
        if(/[^0-9.()/*+-^]/.test(this.expression) || errorMatches.length > 0) {
            throw new Error("Expressão inválida: contém caracteres não permitidos.");
        }

        if(errorMatchesDoOutro.length > 0) {
            throw new Error("Você não pode repetir um operador mais de uma vez")
        }

        const operadorIncompleto = /([+\-*/^])(?=[^0-9\(]|$)|(?<=[^0-9)]|^)([*/^])|([*/^])(?=[^0-9(]|$)/g
        const matchOperadorIncompleto = Array.from(this.expression.matchAll(operadorIncompleto))
        if(matchOperadorIncompleto.length > 0) {
            throw new Error("Um operador espera seu valor")
        }
    }

    demonstarExpressao(expression = this.expression): Array<RegExpMatchArray> {
        const regex = /([+-]?\d+(?:\.\d+)?|[+\-*/^()])/g;
        
        const expressaoEmPartes = Array.from(expression.matchAll(regex));
        if(expressaoEmPartes.length === 0) {
            throw new Error("Expressão com estrutura inválida.");
        }
        
        return expressaoEmPartes
    }   

    convertAllIfPossible(expressaoEmPartes: Array<RegExpMatchArray>): (number | string)[] {
        const expressaoConvertida = expressaoEmPartes.map((parte) => {
            const number = parseFloat(parte[1])
            if(!isNaN(number)) {
                return number;
            } 

            return parte[1];
        });

        return expressaoConvertida;
    }

    efetuarPemdasSemSoma(expressaoConvertida: (number | string)[]): number[] {
        const values = [...expressaoConvertida];
        const operate = (actualPos: number, funcao: (a: number, b:number) => number): void => {
            const before = values[actualPos-1]
            const next = values[actualPos+1]

            if(typeof before === "string" || typeof next === "string") {
                values.splice(actualPos, 1)
            }

            const result = funcao(parseFloat(before?.toString()), parseFloat(next?.toString()));
            values.splice(actualPos-1, 3);
            values.splice(actualPos-1, 0, result);
        }

        for(let i = 0; i < values.length; i++) {
            switch(values[i]) {
                case '^':
                    operate(i, (a, b) => a ** b);
                    i-=1
                    break;
            }
        }
            
        for(let i = 0; i < values.length; i++) {
            switch(values[i]) {
                case '*':
                    operate(i, (a, b) => a * b);
                    i-=1
                    break;
                case '/':
                    operate(i, (a, b) => a / b);
                    i-=1
                    break;
            }
        }

        return values.map((valor) => {
            return parseFloat(valor.toString());
        });
    }

    somarTudo(valores: number[]): number {
        return valores.reduce((acumulador, valor) => acumulador + valor, 0);
    }

    identifiParenteses(expression = this.expression): [number, number][] {
        const openParenteses: number[] = []
        const parentesesPos: [number, number][] = []
        for(let i = 0; i < expression.length; i++) {
            if(expression[i] === "(") {
                openParenteses.push(i);
            } else if(expression[i] === ")") {
                parentesesPos.push([openParenteses.pop() ?? 0, i]);
            }
        }

        if(openParenteses.length !== 0) {
            throw new Error("Você não fechou todos os parênteses")
        }

        parentesesPos.push([-1,expression.length]);

        return parentesesPos
    }

    calcular(): number {
        this.thisExpressionIsCorrect();

        let identifiParenteses = this.identifiParenteses();
        let fullExpression = this.expression;
        let soma = 0; 
        let i = 0;
        let [start, end] = identifiParenteses[i];
        while(identifiParenteses.length > 0 && i < identifiParenteses.length && start !== undefined && end !== undefined) {
            const expressaoEmPartes = this.demonstarExpressao(fullExpression.substring(start+1, end));

            const expressaoConvertida = this.convertAllIfPossible(expressaoEmPartes);
            const res = this.efetuarPemdasSemSoma(expressaoConvertida);
            soma = this.somarTudo(res) * (fullExpression[start-1] === SUBTRACTION_SIMBOL ? -1 : 1);
            if(identifiParenteses.length === 1) {
                return soma; 
            }

            const existsABeforeOperator = isNaN(parseInt(fullExpression[start-1])) && fullExpression[start-1] && !/[\(\)]/.test(fullExpression[start-1]) && ["+", "-"].includes(fullExpression[start-1])
            const somaWithSinal = soma >= 0 ? `+${soma.toString()}` : soma.toString()
            fullExpression = fullExpression.substring(0, start-(existsABeforeOperator ? 1 : 0)) + somaWithSinal + fullExpression.substring(end+1);
            identifiParenteses = this.identifiParenteses(fullExpression);
            [start, end] = identifiParenteses[i];
        }

        return soma
    }
}