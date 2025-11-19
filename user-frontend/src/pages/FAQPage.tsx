import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FAQ"
        description="Common questions about Neatrix cleaning services, bookings, pricing, and support."
        pathname="/faq"
        keywords={["Neatrix FAQ", "cleaning questions", "booking questions"]}
      />
      <Header />
      <main className="pt-20">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;