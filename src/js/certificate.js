// --- CONFIGURAÇÃO DO CERTIFICADO ---
// Edite aqui os textos e cores do certificado
const certificateConfig = {
  title: "CERTIFICADO DE CONCLUSÃO",
  subtitle: "Certificamos que",
  courseName: "DevOps Arcade - Template Track",
  message: "Concluiu com êxito a trilha prática, demonstrando competência nos módulos propostos e completando todos os desafios.",
  footer: "DevOps Arcade | Education",
  colors: {
    cyan: [0, 229, 255],
    magenta: [255, 45, 170],
    dark: [20, 20, 20],
    text: [60, 60, 60],
    subtext: [100, 100, 100],
    courseText: [0, 153, 204] // Ajuste para legibilidade no branco
  }
};

// Função de Geração de Certificado
async function generateCertificate(customName) {
  // Verifica se a biblioteca jsPDF foi carregada
  if (!window.jspdf) {
    console.error("Biblioteca jsPDF não encontrada.");
    alert("Erro ao gerar certificado: Biblioteca não carregada.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Cores
  const { cyan, magenta, dark, text, subtext, courseText } = certificateConfig.colors;

  // Fundo Branco (Melhor para impressão)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 297, 210, 'F');

  // Moldura Dupla (Estilo TRON sutil)
  doc.setLineWidth(1.5);
  doc.setDrawColor(...cyan);
  doc.rect(10, 10, 277, 190);
  doc.setDrawColor(...magenta);
  doc.rect(12, 12, 273, 186);

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(...dark);
  doc.text(certificateConfig.title, 148.5, 50, { align: "center" });

  // Subtítulo
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(...subtext);
  doc.text(certificateConfig.subtitle, 148.5, 70, { align: "center" });

  // Nome do Aluno (Prioridade: Argumento > Input > Padrão)
  const inputElement = document.getElementById('certificate-name');
  const studentName = customName || (inputElement ? inputElement.value : "") || "Estudante Linux";
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(...magenta);
  doc.text(studentName, 148.5, 90, { align: "center" });

  // Linha decorativa
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(70, 95, 227, 95);

  // Nome do Curso
  doc.setFontSize(22);
  doc.setTextColor(...courseText);
  doc.text(certificateConfig.courseName, 148.5, 115, { align: "center" });

  // Mensagem
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(...text);
  const splitText = doc.splitTextToSize(certificateConfig.message, 180);
  doc.text(splitText, 148.5, 135, { align: "center" });

  // Data
  const date = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setFontSize(12);
  doc.setTextColor(...subtext);
  doc.text(`Concluído em ${date}`, 148.5, 165, { align: "center" });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(certificateConfig.footer, 148.5, 190, { align: "center" });

  // Salvar
  doc.save("certificado-conclusao.pdf");
}