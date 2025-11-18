import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useSupabaseData } from "../contexts/SupabaseDataContext";
import { FullScreenCleaningLoader } from "../components/ui/CleaningLoader";

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
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
