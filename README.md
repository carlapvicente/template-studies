# DevOps Arcade — Template Studies

Este repositório serve como **Template Base** para a criação de trilhas educacionais no ecossistema **DevOps Arcade**. Ele fornece toda a estrutura de UI, navegação, rastreamento de progresso e geração de certificados, permitindo que você foque apenas na criação do conteúdo.

## 🚀 Primeiros Passos

1. **Crie seu repositório:** Clique no botão **"Use this template"** no GitHub para criar um novo repositório.
2. **Clone o projeto:** Baixe o repositório para sua máquina.
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Rode o projeto:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:8080` no seu navegador.

---

## ⚙️ Guia de Personalização

Para transformar este template no seu curso (ex: *Docker Studies*), siga o checklist abaixo alterando os arquivos indicados.

### 1. Configurações do Repositório

Defina o nome técnico do projeto e a URL de publicação.

**Arquivo:** `package.json`
> Altere o nome do pacote para o nome do seu projeto.

```json
{
  "name": "docker-studies",  <-- Altere aqui
  "private": true,
  ...
}
```

**Arquivo:** `.github/workflows/deploy.yml`
> **Importante:** A variável `ELEVENTY_BASE_URL` deve ser igual ao nome do seu repositório no GitHub (com a barra na frente). Isso garante que o CSS e JS carreguem corretamente no GitHub Pages.

```yaml
      - name: Build Eleventy site
        run: npm run build
        env:
          ELEVENTY_BASE_URL: /docker-studies  <-- Altere aqui
          ELEVENTY_ENV: production
```

### 2. Identidade Visual e Textos

Personalize os títulos que aparecem na aba do navegador e na página inicial.

**Arquivo:** `src/_includes/partials/head.njk`
> Define o título da aba do navegador e a descrição para SEO.

```html
<meta name="description" content="Aprenda Docker do zero ao avançado...">
<title>{{ pageTitle or title or 'Docker Studies' }}</title>
```

**Arquivo:** `src/_includes/partials/header-home.njk`
> Define o título principal (H1) e o subtítulo exibidos no topo da página inicial.

```html
<header class="portal__header">
  <h1 class="portal__title"><i class="fa-brands fa-docker"></i> Docker Studies</h1>
  <p class="portal__subtitle">Trilha prática de containers e orquestração.</p>
</header>
```

### 3. Funcionalidades do Curso

Configure o certificado e o sistema de progresso.

**Arquivo:** `src/js/certificate.js`
> Personalize as informações que aparecerão no PDF do certificado.

```javascript
const certificateConfig = {
  title: "CERTIFICADO DE CONCLUSÃO",
  courseName: "Docker Studies - Fundamentos", // <-- Nome do curso
  footer: "DevOps Arcade | Docker Track",
  // ...
};
```

**Arquivo:** `src/js/progress-tracker.js`
> **Essencial:** Altere a `storageKey` para um nome único. Se você mantiver o padrão, o progresso de um curso pode sobrescrever o de outro se o aluno fizer ambos.

```javascript
class ProgressTracker {
  constructor() {
    // Use um nome único para seu curso
    this.storageKey = 'docker-studies-progress'; 
    
    // Liste os IDs dos seus módulos aqui (deve bater com o 'moduleId' no arquivo .njk)
    this.modules = [
      '00-onboarding',
      '01-intro-docker',
      '02-containers'
    ];
  }
  // ...
}
```

---

## 📝 Criando Conteúdo (Novos Módulos)

A estrutura de aulas fica na pasta `src/modules/`. Para criar uma nova aula:

1. **Duplique** a pasta `src/modules/level-01-exemplo`.
2. **Renomeie** a pasta para o novo tópico (ex: `level-02-containers`).
3. **Edite** o arquivo `index.njk` dentro da nova pasta:
   - Atualize o cabeçalho (Front Matter) com o título e ID do módulo.
   - Escreva o conteúdo.
4. **Registre** o novo módulo:
   - Adicione o ID no `src/js/progress-tracker.js`.
   - Adicione o Card na página inicial (`src/index.njk`).

---

## 📂 Estrutura de Pastas

Entenda onde cada coisa fica:

```
src/
├── modules/              # Onde ficam as aulas
│   ├── level-00-onboarding/  # Módulo padrão de introdução
│   └── level-01-exemplo/     # Template para copiar e criar novos
├── _includes/            # Componentes e Layouts
├── css/                  # Estilos (Tema TRON)
├── js/                   # Lógica (Progresso, Certificado, UI)
├── samples/              # Design System (Exemplos de componentes)
└── index.njk             # Página Inicial (Lista de módulos)
```

## 📝 Criando Conteúdo

Para criar um novo módulo:

1. Duplique a pasta `src/modules/level-01-exemplo`.
2. Renomeie a pasta (ex: `level-02-containers`).
3. Edite o arquivo `index.njk` dentro da nova pasta:
   - Atualize o **Front Matter** (título, permalink, checklist).
   - Escreva o conteúdo usando HTML e as Macros Nunjucks disponíveis.
4. Adicione o ID do novo módulo em `src/js/progress-tracker.js`.
5. Adicione o Card do novo módulo em `src/index.njk`.

## 🎨 Design System (Samples)

O template inclui uma seção de **Samples** acessível via botão na sidebar. Ela contém a documentação visual de todos os componentes disponíveis (Alertas, Botões, Code Blocks, etc.).

Em produção, esta seção permanece ativa para servir de referência rápida durante a criação de conteúdo.

## 🤝 Contribuindo com o DevOps Arcade

O DevOps Arcade é uma iniciativa para compartilhar conhecimento gratuitamente.

- Cada trilha possui seu próprio repositório e GitHub Pages.
- O **Template Studies** é a base de tudo. Melhorias estruturais devem ser feitas aqui.
- Se você melhorou o template, considere abrir um PR para atualizar a base para todos!

---

*DevOps Arcade — Learn by doing.*