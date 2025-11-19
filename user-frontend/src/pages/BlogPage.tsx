import Header from "@/components/Header";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog"
        description="Neatrix blog: tips and insights on professional cleaning, home care, and eco-friendly practices."
        pathname="/blog"
        keywords={["Neatrix blog", "cleaning tips", "home care", "eco-friendly cleaning"]}
      />
      <Header />
      <main className="pt-20">
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;