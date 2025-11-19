import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About"
        description="Learn about Neatrix — professional cleaning services committed to quality and eco-friendly methods."
        pathname="/about"
        keywords={["About Neatrix", "professional cleaning", "eco-friendly cleaning"]}
      />
      <Header />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;