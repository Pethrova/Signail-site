const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // ── PASSTHROUGH COPIES ──────────────────────────────────────────────────────
  // These folders go to output as-is (CSS, JS, fonts, images)
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/diagnostic.html");
  eleventyConfig.ignores.add("src/diagnostic.html");
  eleventyConfig.addPassthroughCopy("src/thank-you.html");
  eleventyConfig.ignores.add("src/thank-you.html");


  // ── FILTERS ────────────────────────────────────────────────────────────────
  // Format dates for display e.g. "Mar 2026"
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMM yyyy");
  });

  // Full date for <time> element
  eleventyConfig.addFilter("htmlDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  // Reading time estimate
  eleventyConfig.addFilter("readingTime", (content) => {
    const wordsPerMinute = 220;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  });

  // ── COLLECTIONS ────────────────────────────────────────────────────────────
  // All blog posts, sorted newest first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Featured posts (tagged as featured in frontmatter)
  eleventyConfig.addCollection("featured", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .filter(post => post.data.featured === true)
      .sort((a, b) => b.date - a.date);
  });

  // Posts by category — returns unique category list
  eleventyConfig.addCollection("categories", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/blog/*.md");
    const cats = new Set();
    posts.forEach(p => { if (p.data.category) cats.add(p.data.category); });
    return [...cats].sort();
  });

  // ── MARKDOWN ──────────────────────────────────────────────────────────────
  const markdownIt = require("markdown-it");
  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true  // smart quotes, em-dashes etc
  });
  eleventyConfig.setLibrary("md", md);

  // ── BUILD SETTINGS ────────────────────────────────────────────────────────
  return {
    dir: {
      input: "src",           // where your source files live
      output: "_site",        // where 11ty puts the built site (Netlify deploys this)
      includes: "_includes",  // partials (nav, footer, head)
      layouts: "_layouts",    // page templates
      data: "../_data"        // global data files
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",  // allows Nunjucks inside .md files
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
