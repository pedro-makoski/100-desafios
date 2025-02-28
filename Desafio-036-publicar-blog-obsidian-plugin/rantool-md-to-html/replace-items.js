function replaceItens(texto, befores, news) {
    let newTexto = Array.from(texto);
    return newTexto.map((caracter) => {
        let idx; 
        if((idx = befores.indexOf(caracter)) !== -1) {
            return news[idx]
        }

        return caracter
    }).join("")
}

module.exports = replaceItens;