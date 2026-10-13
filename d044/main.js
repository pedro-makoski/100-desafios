function calcularMDC(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}


function calcularMMCDoisNumeros(a, b) {
  if (a === 0 || b === 0) {
    return 0;
  }
  return Math.abs(a * b) / calcularMDC(a, b);
}

function calcularMMCConjunto(numeros) {
  let mmcAtual = numeros[0];

  for (let i = 1; i < numeros.length; i++) {
    mmcAtual = calcularMMCDoisNumeros(mmcAtual, numeros[i]);
  }

  return mmcAtual;
}

function calcularMDCConjunto(numeros) {
  const numerosUnicos = numeros;

  if (numerosUnicos.length === 0) {
    return 0;
  }

  let mdcAtual = numerosUnicos[0];

  if (numerosUnicos.length === 1) {
      return Math.abs(mdcAtual);
  }

  for (let i = 1; i < numerosUnicos.length; i++) {
    mdcAtual = calcularMDC(mdcAtual, numerosUnicos[i]);
    if (mdcAtual === 1) {
      return 1;
    }
  }

  return Math.abs(mdcAtual);
}