
/*
  Explicação geral do script:
  ---------------------------
  Aqui, estamos fazendo a lógica de conversão em JavaScript para demonstrar 
  como a página pode funcionar de forma estática, sem depender de back-end. 
  Entretanto, você pode adaptar para chamar suas funções em Python via requisições 
  se estiver usando Flask/Django/etc.

  As variáveis e funções foram nomeadas em português para facilitar a compreensão.
*/

// Seleciona os elementos do DOM
const entradaDecimal = document.getElementById('entradaDecimal');
const botaoConverterParaBinario = document.getElementById('botaoConverterParaBinario');
const entradaBinaria = document.getElementById('entradaBinaria');
const botaoConverterParaDecimal = document.getElementById('botaoConverterParaDecimal');
const botaoGerarBinario = document.getElementById('botaoGerarBinario');
const resultadoConversao = document.getElementById('resultadoConversao');

/*
  Função: converterDecimalParaBinarioJS
  -------------------------------------
  Converte um número decimal (inteiro) para uma string binária.
  Retorna a string binária correspondente.
*/
function converterDecimalParaBinarioJS(numeroDecimal) {
  // Se for zero, retornamos '0'
  if (numeroDecimal === 0) {
    return '0';
  }

  let numeroTemporario = numeroDecimal;
  let binarioInvertido = '';

  // Loop para montar a string binária ao contrário
  while (numeroTemporario > 0) {
    const resto = numeroTemporario % 2;
    binarioInvertido += resto.toString();
    numeroTemporario = Math.floor(numeroTemporario / 2);
  }

  // Inverte a string
  return binarioInvertido.split('').reverse().join('');
}

/*
  Função: converterBinarioParaDecimalJS
  --------------------------------------
  Converte uma string binária para um número decimal (inteiro).
  Retorna o valor decimal correspondente.
*/
function converterBinarioParaDecimalJS(numeroBinario) {
  let decimal = 0;

  for (let i = 0; i < numeroBinario.length; i++) {
    // Multiplica por 2
    decimal *= 2;
    // Se for '1', adiciona 1
    if (numeroBinario[i] === '1') {
      decimal += 1;
    }
  }
  return decimal;
}

/*
  Evento: Clique no botão "Converter para Binário"
  ------------------------------------------------
  Pega o valor do campo 'entradaDecimal', converte para inteiro
  e chama a função de conversão. Exibe o resultado no 'resultadoConversao'.
*/
botaoConverterParaBinario.addEventListener('click', () => {
  // Converte o valor de entradaDecimal para número inteiro
  const valorDecimal = parseInt(entradaDecimal.value, 10);

  // Verifica se o valorDecimal é um número
  if (isNaN(valorDecimal)) {
    resultadoConversao.textContent = 'Por favor, digite um número decimal válido.';
    return;
  }

  const binario = converterDecimalParaBinarioJS(valorDecimal);
  resultadoConversao.textContent = `Decimal ${valorDecimal} em binário é: ${binario}`;
});

/*
  Evento: Clique no botão "Converter para Decimal"
  ------------------------------------------------
  Pega o valor do campo 'entradaBinaria' como string,
  e chama a função de conversão. Exibe o resultado.
*/
botaoConverterParaDecimal.addEventListener('click', () => {
  const valorBinario = entradaBinaria.value;

  // Validação simples: checa se contém apenas '0' e '1'
  if (!/^[01]+$/.test(valorBinario)) {
    resultadoConversao.textContent = 'Por favor, digite um número binário válido (somente 0 ou 1).';
    return;
  }

  const decimal = converterBinarioParaDecimalJS(valorBinario);
  resultadoConversao.textContent = `Binário ${valorBinario} em decimal é: ${decimal}`;
});

/*
  Evento: Clique no botão "Gerar Número Binário Aleatório"
  --------------------------------------------------------
  Gera um número binário aleatório (de tamanho fixo ou variável),
  exibe no campo 'entradaBinaria' e limpa o resultado anterior.
*/
botaoGerarBinario.addEventListener('click', () => {
  // Gera um tamanho aleatório entre 3 e 8 bits (por exemplo)
  const tamanho = Math.floor(Math.random() * 6) + 3; // 3 a 8
  let numeroBinarioAleatorio = '';

  for (let i = 0; i < tamanho; i++) {
    // Adiciona '0' ou '1' aleatoriamente
    numeroBinarioAleatorio += Math.random() < 0.5 ? '0' : '1';
  }

  // Mostra esse valor no campo de binário
  entradaBinaria.value = numeroBinarioAleatorio;
  // Limpa o campo de decimal
  entradaDecimal.value = '';
  // Limpa o resultado
  resultadoConversao.textContent = '';
});
