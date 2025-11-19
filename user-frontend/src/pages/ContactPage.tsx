import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact"
        description="Get in touch with Neatrix for bookings, support, and inquiries. We're here to help with professional cleaning services."
        pathname="/contact"
        keywords={["Neatrix contact", "cleaning service contact", "customer support"]}
      />
      <Header />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;