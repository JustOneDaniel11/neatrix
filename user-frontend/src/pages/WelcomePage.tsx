import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSupabaseData } from "@/contexts/SupabaseDataContext";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { state } = useSupabaseData();

  useEffect(() => {
    const dismissed = localStorage.getItem("neatrix-welcome-dismissed") === "1";
    if (!state.isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    if (dismissed) {
      navigate("/dashboard", { replace: true });
    }
  }, [state.isAuthenticated, navigate]);

  const name = state.currentUser?.full_name || state.authUser?.email || "Welcome";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-600 to-fuchsia-600 text-primary-foreground shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 sm:p-12">
                <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs">
                  <span>Signed in</span>
                </div>
                <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{typeof name === "string" ? name : "Welcome"}</h1>
                <p className="mt-3 text-sm sm:text-base text-white/90">Your Neatrix account is ready. Access bookings, delivery tracking, payments, and more.</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => { localStorage.setItem("neatrix-welcome-dismissed", "1"); navigate("/dashboard", { replace: true }); }} className="inline-flex items-center justify-center rounded-lg bg-white text-purple-700 px-4 py-2 font-semibold hover:bg-white/90">
                    Go to dashboard
                  </button>
                  <button onClick={() => navigate("/services")} className="inline-flex items-center justify-center rounded-lg bg-white/10 text-white px-4 py-2 font-semibold hover:bg-white/20">
                    Explore services
                  </button>
                </div>
              </div>
              <div className="hidden md:block p-8 sm:p-12">
                <div className="h-full w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl">✨</div>
                    <div className="mt-2 text-sm text-white/90">Welcome to Neatrix</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;