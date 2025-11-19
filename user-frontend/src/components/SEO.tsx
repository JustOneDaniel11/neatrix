import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  robots?: string; // e.g., "index, follow" or "noindex, nofollow"
};

const SITE_URL = "https://neatrix.site";
const DEFAULT_TITLE = "Neatrix - Professional Cleaning Services";
const DEFAULT_DESC = "Expert cleaning for homes, offices, and schools. Eco-friendly and professional.";
const DEFAULT_IMAGE = `${SITE_URL}/Neatrix_logo_transparent.png`;

export function SEO({ title, description, pathname = "", image, robots }: SEOProps) {
  const fullTitle = title ? `${title} | Neatrix` : DEFAULT_TITLE;
  const canonical = `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  const ogImage = image || DEFAULT_IMAGE;
  const robotsContent = robots || "index, follow";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || DEFAULT_DESC} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || DEFAULT_DESC} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Neatrix" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Neatrix Logo" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || DEFAULT_DESC} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export default SEO;