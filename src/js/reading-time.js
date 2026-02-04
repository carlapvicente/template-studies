document.addEventListener('DOMContentLoaded', () => {
  const contentElement = document.querySelector('.module__content');
  const timeElement = document.getElementById('reading-time');

  if (contentElement && timeElement) {
    // Obtém o texto visível do módulo
    const text = contentElement.innerText;
    
    // Conta as palavras (separando por espaços em branco)
    const wordCount = text.trim().split(/\s+/).length;
    
    // Velocidade média de leitura (palavras por minuto)
    const wordsPerMinute = 200;
    
    // Calcula os minutos (arredondando para cima)
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // Atualiza o elemento na tela
    timeElement.textContent = `${readingTime} min de leitura`;
  }
});