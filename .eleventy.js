// .eleventy.js
module.exports = function (eleventyConfig) {
  // Copia assets estáticos para o _site
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  // Base path: local = "/", GitHub Pages project = "/template-studies/"
  const baseUrl = process.env.ELEVENTY_BASE_URL || "/";

  // Helper para prefixar URLs com base path
  eleventyConfig.addFilter("url", function (path) {
    if (!path) return baseUrl;
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  });

  // ✨ Passar variável de ambiente para templates
  eleventyConfig.addGlobalData("isDevelopment", process.env.ELEVENTY_ENV !== "production");
  eleventyConfig.addGlobalData("buildTime", new Date().getTime());

  // ✨ Excluir samples em produção
  // Comentado para permitir que o Design System (Samples) seja visível no Template em produção
  // eleventyConfig.ignores.add("src/samples");
  eleventyConfig.ignores.add("src/js/generate-glossary.js");

  // ✨ Coleção automática de módulos
  eleventyConfig.addCollection("modules", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/modules/*/index.njk")
      .filter(item => item.data.moduleId) // Garante que tem ID definido
      .sort((a, b) => a.data.moduleId.localeCompare(b.data.moduleId));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "html", "md"]
  };
};
