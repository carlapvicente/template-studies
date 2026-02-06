// Função para toggle de conclusão do módulo
function toggleModuleComplete(moduleId) {
  const tracker = window.progressTracker;
  const isCurrentlyComplete = tracker.isComplete(moduleId);
  
  // Verificar estado antes da mudança
  const was100 = tracker.getOverallProgress() === 100;
  
  if (isCurrentlyComplete) {
    // Desmarcar
    const progress = tracker.getProgress();
    delete progress[moduleId];
    localStorage.setItem('template-studies-progress', JSON.stringify(progress));
    tracker.triggerUpdateEvent();
  } else {
    // Marcar
    tracker.markComplete(moduleId);
  }
  
  // Verificar estado após a mudança
  const is100 = tracker.getOverallProgress() === 100;
  
  // Se completou 100% agora, soltar confetes!
  if (!was100 && is100) {
    // 1. Abrir modal (efeito de blur aparece)
    const completionModal = document.getElementById('completion-modal');
    if (completionModal) {
      completionModal.classList.add('is-open');
      completionModal.setAttribute('aria-hidden', 'false');
      
      // 2. Rolar para o topo suavemente (enquanto o blur está ativo)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // 3. Disparar confetes e travar o scroll após a animação de subida
      setTimeout(() => {
        launchConfetti();
        document.body.style.overflow = 'hidden';
      }, 800);
    }
  }
  
  updateProgressDisplay();
}

// Função para atualizar a exibição do progresso
function updateProgressDisplay() {
  const tracker = window.progressTracker;
  const progress = tracker.getOverallProgress();
  const completed = Object.keys(tracker.getProgress()).length;
  
  // Atualizar barra
  const progressBar = document.getElementById('progress-bar-fill');
  if (progressBar) progressBar.style.width = progress + '%';
  
  // Atualizar texto
  const progressText = document.getElementById('progress-text');
  if (progressText) progressText.textContent = completed;
  
  // Atualizar estilo do container (Brilho Extra)
  const container = document.querySelector('.portal__progress-overview');
  if (container) {
    container.classList.toggle('portal__progress-overview--completed', progress === 100);
  }
  
  // Atualizar cards e botões completados
  document.querySelectorAll('[data-module-id]').forEach(card => {
    const moduleId = card.dataset.moduleId;
    const isComplete = tracker.isComplete(moduleId);
    
    card.classList.toggle('module__card--completed', isComplete);
    
    // Atualizar texto do botão
    const btn = card.querySelector('.module__complete-btn .btn-text');
    if (btn) btn.textContent = isComplete ? 'Desmarcar' : 'Marcar como Concluído';
    
    // Atualizar ícone do botão
    const icon = card.querySelector('.module__complete-btn .btn-icon');
    if (icon) {
      icon.className = isComplete 
        ? 'btn-icon fa-solid fa-square-check' 
        : 'btn-icon fa-regular fa-square';
    }
  });
}

// Função de Confete (Celebração)
function launchConfetti() {
  if (typeof confetti === 'undefined') return;
  
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2001 };
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// Expor funções globalmente para os atributos onclick do HTML
window.toggleModuleComplete = toggleModuleComplete;

// Inicialização
document.addEventListener('DOMContentLoaded', updateProgressDisplay);
window.addEventListener('progressUpdated', updateProgressDisplay);

// Lógica do Modal de Reset (separada para não poluir o escopo global desnecessariamente)
window.confirmReset = function() {
  window.progressTracker.resetProgress();
  
  // Limpar checklists individuais
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('module-progress-')) localStorage.removeItem(key);
  });

  updateProgressDisplay();
  
  // Fechar modal
  const modal = document.getElementById('reset-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Feedback visual
  const notification = document.createElement('div');
  notification.className = 'progress-reset-notification';
  notification.textContent = '✓ Curso reiniciado com sucesso!';
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};