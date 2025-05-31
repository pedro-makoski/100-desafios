class Matrix {
    private order: [number, number]
    public matrix: number[][]

    constructor(matrix: number[][]) {
        this.matrix = matrix
        if(!Matrix.correctMatrix(this.matrix)) {
           throw new Error("Matriz invalida") 
        }

        this.order = this.getOrder()
    }

    public isQuadrada(order = this.order): boolean {
        return order[0] === order[1] 
    }

    public getColum(colum: number, matrix = this.matrix): number[] {
        if(matrix.length === 0 || matrix[0].length < colum-1 || colum-1 < 0) {
            throw new Error("Coluna não encontrada")
        }

        const coluna: number[] = []
        matrix.forEach(linha => {
            coluna.push(linha[colum-1])
        })

        return coluna
    }

    public getLine(line: number, matrix = this.matrix): number[] {
        if(matrix.length < line-1 || line-1 < 0) {
            throw new Error("Linha não encontrada")
        }

        return matrix[line-1]
    }

    public getMenorComplementar(pos: [number, number], matrix = this.matrix): Matrix {
        const newMatrix: number[][] = []
        matrix.forEach((linha, indexlinha) => {
            if(indexlinha === pos[0]) {
                return 
            }
            const linhaEls: number[] = []
            linha.forEach((coluna, indexColuna) => {
                if(indexColuna === pos[1]) {
                    return 
                }
                linhaEls.push(coluna)
            })
            newMatrix.push(linhaEls)
        })

        return new Matrix(newMatrix)
    }

    public getCofator(pos: [number, number], matrix = this.matrix) {
        const menorComplementar: Matrix = this.getMenorComplementar(pos, matrix)
        const det = menorComplementar.getDeterminante()
        return Math.pow(-1, pos[0] + pos[1]) * det
    }

    public getValue(linha: number, coluna: number, matrix = this.matrix): number {
        const newLinha = linha-1
        const newColuna = coluna-1

        if(linha > this.matrix.length || newLinha < 0 || coluna > this.matrix[0].length || newColuna < 0) {
            throw new Error("A matriz não tem essa posição")
        } 

        return matrix[newLinha][newColuna]
    }

    public getDeterminante(matrix = this.matrix, order = this.order): number {
        if(!this.isQuadrada()) {
            throw new Error("O determinante só pode ser calculado de matrizes quadradas")
        }

        if(order[0] === 1) {
            return matrix[0][0]
        }

        let det = 0
        for(let i = 0; i < order[1]; i++) {
            det += matrix[0][i] * this.getCofator([0, i])
        }

        return det 
    }

    public CreateNewMatrix(operation: (valorAtual: number, posLinha: number, posColuna: number) => number, matrix = this.matrix): Matrix {
        const newMatrix: number[][] = []

        matrix.forEach((line, indexLinha) => {
            const newLine: number[] = []

            line.forEach((valor, indexColuna) => {
                newLine.push(operation(valor, indexLinha, indexColuna))
            })

            newMatrix.push(newLine)
        });

        return new Matrix(newMatrix)
    }

    public getTransposta(matrix = this.matrix): Matrix {
        const newMatrix: number[][] = structuredClone(matrix)

        for(let i = 0; i < matrix.length; i ++) {
            for(let j = 0; j < matrix[i].length; j++) {
                newMatrix[i][j] = matrix[j][i]
            }
        }

        return new Matrix(newMatrix)
    }

    public getMatrizDeCofatores(matrix = this.matrix): Matrix {
        return this.CreateNewMatrix((valor, posLinha, posColuna) => this.getCofator([posLinha, posColuna]))
    }

    public getMatrixAdjunta(matrix = this.matrix): Matrix {
        const newMatrix = this.getMatrizDeCofatores(matrix)
        return newMatrix.getTransposta()
    }

    public MultiplyValorReal(numero: number, matrix = this.matrix): Matrix {
        return this.CreateNewMatrix((valor) => valor * numero)
    }

    public getMatrixInversa(matrix = this.matrix) {
        const det = this.getDeterminante()
        if(det === 0) {
            throw new Error("A matriz não tem inversa, pois o determinante é 0")
        }

        const adjunta = this.getMatrixAdjunta()
        return adjunta.MultiplyValorReal(1/det)
    }

    public SumWithOtherMatrix(otherMatrix: Matrix, multiplo: number = 1, matrix = this.matrix): Matrix {
        const orderMatrix = this.getOrder(matrix)
        const orderNewMatrix = this.getOrder(otherMatrix.matrix)
        if(orderMatrix[0] !== orderNewMatrix[0] || orderMatrix[1] !== orderNewMatrix[1]) {
            throw new Error("Impossivel somar/subtrair matrizes de ordems diferentes")
        }


        return this.CreateNewMatrix((valor, posLinha, posColuna) => valor+(otherMatrix.matrix[posLinha][posColuna]*multiplo), matrix)
    }

    public MultiplicarComOutraMatriz(otherMatrix: Matrix, matrix = this.matrix): Matrix {
        const newMatrix:number[][] = []
        const orderMatrix = this.getOrder(matrix)
        const orderOtherMatrix = otherMatrix.getOrder()

        if(orderMatrix[1] !== orderOtherMatrix[0]) {
            throw new Error("Impossivel multiplicar matriz. Pois o número de colunas da primeira matriz não é igual ao número de linhas da segunda matriz, mas precisa ser")
        }

        const newOrder: [number, number] = [orderMatrix[0], orderOtherMatrix[1]]

        for(let i = 0; i < newOrder[0]; i++) {
            const newLine: number[] = []
            for(let j = 0; j < newOrder[1]; j++) {
                let sum = 0
                for(let k = 0; k < orderMatrix[1]; k++) {
                    sum += matrix[i][k] * otherMatrix.matrix[k][j]
                }
                newLine.push(sum)
            }

            newMatrix.push(newLine)
        }

        return new Matrix(newMatrix)
    }

    static correctMatrix(matrix: number[][]): boolean {
        if(matrix.length === 0) {
            return false 
        }
    
       
        let length: number = matrix[0]?.length
        if(length === 0) {
            return false 
        }

        for(let linha of matrix) {
            if(linha.length !== length) {
                return false 
            }
        }

        return true
    }

    public getOrder(matrix = this.matrix): [number, number] {
        return [matrix.length, matrix[0].length]
    }

    public elevarA(expoente: number, matrix = this.matrix): Matrix {
        let resultado = new Matrix(matrix)

        if(Math.floor(expoente) !== expoente) {
            throw new Error("Ainda não calculamos a raiz quadrada de uma matriz")
        }

        for(let i = 0; i < expoente-1; i++) {
            resultado = resultado.MultiplicarComOutraMatriz(resultado)
        }

        return resultado
    }
}