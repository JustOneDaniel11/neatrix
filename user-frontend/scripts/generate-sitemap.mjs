import fs from "fs";
import path from "path";

// Configurable base URL; defaults to production domain
const SITE_URL = process.env.SITE_URL || "https://neatrix.site";

// File paths
const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dataFile = path.resolve(projectRoot, "src", "data", "blogPosts.ts");
const outputFile = path.resolve(projectRoot, "public", "sitemap.xml");

// Static routes to include in sitemap
const staticRoutes = [
  { loc: "/", changefreq: "weekly", priority: 1.0 },
  { loc: "/services", changefreq: "weekly", priority: 0.9 },
  { loc: "/about", changefreq: "monthly", priority: 0.6 },
  { loc: "/contact", changefreq: "monthly", priority: 0.6 },
  { loc: "/faq", changefreq: "monthly", priority: 0.5 },
  { loc: "/gallery", changefreq: "monthly", priority: 0.5 },
  { loc: "/blog", changefreq: "weekly", priority: 0.7 },
  { loc: "/terms", changefreq: "yearly", priority: 0.3 },
  { loc: "/privacy", changefreq: "yearly", priority: 0.3 },
];

function extractSlugsFromBlogPosts(tsContent) {
  const slugRegex = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(tsContent)) !== null) {
    slugs.push(match[1]);
  }
  return Array.from(new Set(slugs));
}

function generateXml(urlEntries) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const footer = "</urlset>\n";
  const body = urlEntries
    .map(({ loc, changefreq, priority }) => {
      return [
        "  <url>",
        `    <loc>${SITE_URL}${loc}</loc>`,
        changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
        typeof priority === "number" ? `    <priority>${priority.toFixed(1)}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
  return `${header}\n${body}\n${footer}`;
}

function main() {
  // Read blogPosts.ts
  const tsContent = fs.readFileSync(dataFile, "utf8");
  const slugs = extractSlugsFromBlogPosts(tsContent);

  // Build URL entries
  const urls = [...staticRoutes];
  for (const slug of slugs) {
    urls.push({ loc: `/blog/${slug}`, changefreq: "monthly", priority: 0.6 });
  }

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  // Write sitemap.xml
  const xml = generateXml(urls);
  fs.writeFileSync(outputFile, xml, "utf8");
  console.log(`Sitemap generated with ${urls.length} URLs at ${outputFile}`);
}

main();