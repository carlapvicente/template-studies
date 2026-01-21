// .eleventy.js
module.exports = function (eleventyConfig) {
  // Copia assets estáticos para o _site
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // Base path: local = "/", GitHub Pages project = "/linux-studies/"
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

  // ✨ Excluir samples em produção
  const isProduction = process.env.ELEVENTY_ENV === "production";
  if (isProduction) {
    eleventyConfig.ignores.add("src/samples");
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "html", "md"]
  };
};
