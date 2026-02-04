document.addEventListener('DOMContentLoaded', () => {
  const quizzes = document.querySelectorAll('[data-quiz]');

  // --- Score Logic ---
  let currentScore = 0;
  const totalQuizzes = quizzes.length;
  const scoreDisplay = document.getElementById('quiz-score-display');

  function updateScoreDisplay() {
    if (!scoreDisplay) return;
    scoreDisplay.innerHTML = `<i class="fa-solid fa-star" style="color: var(--accent-gold)"></i> Pontuação: <strong>${currentScore}</strong> / ${totalQuizzes}`;
    
    if (currentScore === totalQuizzes && totalQuizzes > 0) {
      scoreDisplay.classList.add('quiz-score--completed');
    }
  }

  if (totalQuizzes > 0) updateScoreDisplay();

  quizzes.forEach(quiz => {
    const optionsContainer = quiz.querySelector('.quiz__options');
    const options = Array.from(quiz.querySelectorAll('.quiz__option'));

    // Embaralhar opções (Fisher-Yates Shuffle)
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    // Reordenar no DOM
    if (optionsContainer) {
      options.forEach(option => optionsContainer.appendChild(option));
    }

    const correctMsg = quiz.dataset.correctMsg || 'Correto!';
    const incorrectMsg = quiz.dataset.incorrectMsg || 'Incorreto.';
    const footer = quiz.querySelector('.quiz__footer');
    const resetBtn = quiz.querySelector('.quiz__reset-btn');

    options.forEach(option => {
      option.addEventListener('click', () => {
        // Se já acertou, não faz nada
        if (quiz.classList.contains('is-solved')) return;

        const isCorrect = option.dataset.correct === 'true';
        const icon = option.querySelector('.quiz__status-icon');

        // Obter explicação específica desta opção
        const explanationEl = option.querySelector('.quiz__option-explanation');
        const explanationText = explanationEl ? explanationEl.innerHTML : '';

        // Criar elemento de feedback dinamicamente
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'quiz__feedback';
        
        // Montar conteúdo
        let feedbackHeader = '';
        let feedbackClass = '';

        if (isCorrect) {
          feedbackClass = 'quiz__feedback--correct';
          feedbackHeader = `<div class="quiz__feedback-header"><i class="fa-solid fa-circle-check"></i> <span>${correctMsg}</span></div>`;

          option.classList.add('is-correct');
          option.classList.remove('is-incorrect');
          icon.className = 'quiz__status-icon fa-solid fa-check';
          
          quiz.classList.add('is-solved');

          // Atualizar pontuação
          currentScore++;
          updateScoreDisplay();
          
          // Desabilitar todos os botões
          options.forEach(btn => btn.disabled = true);
        } else {
          feedbackClass = 'quiz__feedback--incorrect';
          feedbackHeader = `<div class="quiz__feedback-header"><i class="fa-solid fa-circle-xmark"></i> <span>${incorrectMsg}</span></div>`;

          option.classList.add('is-incorrect');
          icon.className = 'quiz__status-icon fa-solid fa-xmark';
          
          // Desabilitar apenas este botão para evitar cliques repetidos
          option.disabled = true;
        }

        feedbackDiv.classList.add(feedbackClass);
        feedbackDiv.innerHTML = `${feedbackHeader}<div class="quiz__explanation">${explanationText}</div>`;

        // Inserir após a opção clicada
        option.insertAdjacentElement('afterend', feedbackDiv);

        // Mostrar botão de reiniciar
        if (footer) footer.hidden = false;
      });
    });

    // Lógica de Reinício
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Se estava resolvido, diminuir pontuação para manter o contador correto
        if (quiz.classList.contains('is-solved')) {
          currentScore--;
          updateScoreDisplay();
          quiz.classList.remove('is-solved');
        }

        // Limpar estado das opções
        options.forEach(option => {
          option.classList.remove('is-correct', 'is-incorrect');
          option.disabled = false;
          const icon = option.querySelector('.quiz__status-icon');
          if (icon) icon.className = 'quiz__status-icon fa-solid';
        });

        // Remover mensagens de feedback
        quiz.querySelectorAll('.quiz__feedback').forEach(el => el.remove());

        // Esconder rodapé novamente
        if (footer) footer.hidden = true;
      });
    }
  });
});