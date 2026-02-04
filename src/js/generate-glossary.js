const fs = require('fs');
const path = require('path');
const glob = require('tinyglobby'); // Usando a lib que já está no node_modules do Eleventy

const SRC_DIR = 'src';
const OUTPUT_FILE = 'src/_data/glossary.json';

// Regex para capturar {{ ui.tooltip(term='...', definition='...') }}
// Suporta aspas simples ou duplas e quebras de linha
const TOOLTIP_REGEX = /ui\.tooltip\s*\(\s*term\s*=\s*(["'])(.*?)\1\s*,\s*definition\s*=\s*(["'])(.*?)\3\s*\)/gs;

async function generateGlossary() {
  console.log('DevOps Arcade: Gerando glossário automático...');

  // 1. Encontrar todos os arquivos .njk
  const files = await glob.glob(`${SRC_DIR}/**/*.njk`);
  const termsMap = new Map();

  // 2. Ler arquivos e extrair tooltips
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    let match;

    while ((match = TOOLTIP_REGEX.exec(content)) !== null) {
      const term = match[2];
      const definition = match[4];

      // Armazena no Map para evitar duplicatas (mantém a última definição encontrada)
      // Normaliza a chave para lowercase para evitar duplicatas por caixa alta/baixa
      if (!termsMap.has(term.toLowerCase())) {
        termsMap.set(term.toLowerCase(), { term, definition });
      }
    }
  }

  // 3. Converter para array e ordenar alfabeticamente
  const glossary = Array.from(termsMap.values()).sort((a, b) => 
    a.term.localeCompare(b.term)
  );

  // 4. Salvar no arquivo de dados do Eleventy
  // Se o diretório _data não existir, cria
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(glossary, null, 2));
  
  console.log(`✓ Glossário gerado com ${glossary.length} termos em ${OUTPUT_FILE}`);
}

generateGlossary().catch(err => {
  console.error('Erro ao gerar glossário:', err);
  process.exit(1);
});