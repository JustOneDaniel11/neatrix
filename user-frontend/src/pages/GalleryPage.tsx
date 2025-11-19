import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gallery"
        description="See Neatrix cleaning results — before and after photos of homes and offices."
        pathname="/gallery"
        keywords={["Neatrix gallery", "cleaning photos", "before and after"]}
      />
      <Header />
      <main className="pt-20">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;