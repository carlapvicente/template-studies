# Guia de Contribuição - DevOps Arcade Template

Obrigado pelo interesse em contribuir com o **DevOps Arcade Template**! 🎉

Este repositório é a **base estrutural** utilizada para criar diversas trilhas de estudo. Melhorias feitas aqui beneficiam todos os cursos que utilizam este template.

---

## 🎯 Como posso contribuir?

### 1. Criando Novos Cursos (Conteúdo)
Se o seu objetivo é criar um curso completo (ex: *Kubernetes Studies*), você **não precisa** abrir um Pull Request neste repositório.

- Utilize o botão **"Use this template"** na página inicial do repositório para criar o seu próprio projeto.
- Siga as instruções do `README.md` para personalizar o seu curso.

### 2. Melhorando o Template (Estrutura)
Se você quer melhorar a base para todos (ex: corrigir um bug no layout, otimizar um script, criar um novo componente), siga as diretrizes abaixo.

#### 🐛 Correções de Bugs
- Verifique se o bug já foi reportado nas **Issues**.
- Se não, abra uma nova Issue descrevendo o problema e como reproduzi-lo.
- Se quiser corrigir, faça um **Fork** do projeto, crie uma branch com a correção e abra um **Pull Request (PR)**.

#### ⚡ Melhorias de Script (JS)
- Todo o JavaScript do projeto fica em `src/js/`.
- Evite scripts inline nos arquivos `.njk`.
- Mantenha o código modular e independente.
- Se adicionar uma nova funcionalidade global, lembre-se de registrá-la no `.eleventy.js` se necessário.

#### 🎨 Novos Componentes UI
Quer adicionar um novo componente visual (ex: um novo tipo de Card ou Gráfico)?

1. **Crie a Macro Nunjucks:** Adicione a definição em `src/_includes/macros/ui.njk`.
2. **Estilize com Sass:**
   - Crie um arquivo em `src/scss/components/_novo-componente.scss`.
   - Registre o novo arquivo em `src/scss/components/_index.scss`.
   - Use variáveis CSS (`var(--cyan)`, `var(--radius)`) para manter a consistência do tema TRON.
3. **Documente:**
   - Crie uma página de exemplo em `src/samples/components/novo-componente.njk`.
   - Adicione o link na barra lateral de Samples (`src/_includes/partials/aside-samples.njk`).
   - Adicione o link na página inicial de Samples (`src/samples/index.njk`).

---

## 🛠️ Fluxo de Desenvolvimento

1. **Fork & Clone:**
   ```bash
   git clone https://github.com/SEU-USUARIO/template-studies.git
   cd template-studies
   npm install
   ```

2. **Crie uma Branch:**
   Use nomes descritivos para sua branch:
   ```bash
   git checkout -b feature/novo-componente-timeline
   # ou
   git checkout -b fix/bug-menu-mobile
   ```

3. **Desenvolva & Teste:**
   Rode o servidor local para ver suas alterações em tempo real:
   ```bash
   npm run dev
   ```

4. **Verifique o Código (Lint):**
   Antes de commitar, garanta que seu CSS está seguindo os padrões:
   ```bash
   npm run lint:css
   ```
   *(Se houver erros, tente `npm run lint:css:fix` para correção automática)*

5. **Commit & Push:**
   ```bash
   git add .
   git commit -m "feat: adiciona componente de timeline"
   git push origin feature/novo-componente-timeline
   ```

6. **Abra um Pull Request:**
   Vá até o repositório original e clique em "Compare & pull request". Descreva suas alterações detalhadamente.

---

## 📐 Padrões de Projeto

- **CSS/Sass:** Utilizamos a arquitetura 7-1 simplificada (`base`, `components`, `layout`, `pages`). Sempre use as variáveis de cor definidas em `_variables.scss`.
- **HTML/Nunjucks:** Use tags semânticas (`<header>`, `<main>`, `<article>`).
- **Acessibilidade:** Garanta que novos componentes sejam navegáveis por teclado e tenham atributos `aria-*` corretos.
- **Commits:** Recomendamos o padrão Conventional Commits (ex: `feat:`, `fix:`, `docs:`, `style:`).