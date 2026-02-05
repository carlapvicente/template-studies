const fs = require('fs');
const glob = require('tinyglobby');

const MODULES_GLOB = 'src/modules/*/index.njk';
// Regex para capturar moduleId: "valor" ou moduleId: valor
const MODULE_ID_REGEX = /^moduleId:\s*(?:["']?)(.*?)(?:["']?)\s*$/m;

async function validateModules() {
  console.log('DevOps Arcade: Validando unicidade dos Module IDs...');

  const files = await glob.glob(MODULES_GLOB);
  const moduleIds = new Map();
  let hasError = false;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const match = content.match(MODULE_ID_REGEX);

    if (!match) {
      // Ignora arquivos sem moduleId definido
      continue; 
    }

    const moduleId = match[1].trim();

    if (moduleIds.has(moduleId)) {
      console.error(`❌ Erro: 'moduleId' duplicado encontrado: "${moduleId}"`);
      console.error(`   - Arquivo 1: ${moduleIds.get(moduleId)}`);
      console.error(`   - Arquivo 2: ${file}`);
      hasError = true;
    } else {
      moduleIds.set(moduleId, file);
    }
  }

  if (hasError) {
    console.error('\nFalha na validação dos módulos. Corrija os IDs duplicados.');
    process.exit(1);
  } else {
    console.log(`✓ Sucesso: ${moduleIds.size} módulos validados com IDs únicos.`);
  }
}

validateModules().catch(err => {
  console.error('Erro fatal na validação:', err);
  process.exit(1);
});