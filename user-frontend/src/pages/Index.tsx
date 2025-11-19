import Header from "../components/Header";
import Hero from "../components/Hero";
import React, { Suspense } from "react";
const Services = React.lazy(() => import("../components/Services"));
const Testimonials = React.lazy(() => import("../components/Testimonials"));
const Contact = React.lazy(() => import("../components/Contact"));
import Footer from "../components/Footer";
import { useSupabaseData } from "../contexts/SupabaseDataContext";
import { FullScreenCleaningLoader } from "../components/ui/CleaningLoader";
import { SEO } from "../components/SEO";
import { StructuredData } from "../components/StructuredData";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const { state } = useSupabaseData();

  console.log("Index page rendering - Loading:", state.loading, "Error:", state.error);

  if (state.loading) {
    return <FullScreenCleaningLoader text="Loading Neatrix..." />;
  }

  if (state.error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'red',
        color: 'white',
        fontSize: '24px'
      }}>
        <div>Error: {state.error}</div>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title="Home"
        description="Professional cleaning services for homes, offices, and schools. Book Neatrix today."
        pathname="/"
        image="https://neatrix.site/Neatrix_logo_transparent.png"
      />
      {/* Preload hero image for faster LCP */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/hero-cleaning-1200.webp"
          imagesrcset="/images/hero-cleaning-600.webp 600w, /images/hero-cleaning-900.webp 900w, /images/hero-cleaning-1200.webp 1200w"
          imagesizes="(max-width: 1024px) 100vw, 1200px"
        />
      </Helmet>
      {/* JSON-LD: Organization + Website + LocalBusiness */}
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Neatrix",
            url: "https://neatrix.site",
            logo: "https://neatrix.site/Neatrix_logo_transparent.png",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Neatrix",
            url: "https://neatrix.site",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://neatrix.site/blog?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Neatrix Cleaning Services",
            url: "https://neatrix.site",
            image: "https://neatrix.site/Neatrix_logo_transparent.png",
            priceRange: "$$",
            areaServed: "Nigeria",
            telephone: "+2349034842430",
          },
        ]}
      />
      <Header />
      <Hero />
      {/* Brand paragraph with internal links to strengthen site structure */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Neatrix is your trusted partner for professional cleaning services. Explore our
            <a href="/services" className="text-primary hover:text-primary/80 mx-1">services</a>,
            get in touch via <a href="/contact" className="text-primary hover:text-primary/80">contact</a>,
            and read expert tips on our <a href="/blog" className="text-primary hover:text-primary/80">blog</a>.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="h-24" />}> 
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-24" />}> 
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-24" />}> 
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
