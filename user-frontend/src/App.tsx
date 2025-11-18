import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import EmailVerificationSuccessPage from "./pages/EmailVerificationSuccessPage";
import EmailPreview from "./pages/EmailPreview";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import DashboardPage from "./pages/DashboardPage";
// Removed duplicate admin imports; real admin lives in /neatrixadmin
import SupportPage from "./pages/SupportPage";
import BookingPage from "./pages/BookingPage";
import NotFound from "./pages/NotFound";
import TestPage from "./pages/TestPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import WelcomePage from "./pages/WelcomePage";
// Removed AdminDashboardWrapper; /admin routes are not served by main app
import { SupabaseDataProvider, useSupabaseData } from "./contexts/SupabaseDataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ServiceStatusBanner from "./components/ServiceStatusBanner";

const queryClient = new QueryClient();

const StatusBannerHost = () => {
  const { state } = useSupabaseData();
  console.log('StatusBannerHost - state:', state);
  return <ServiceStatusBanner errorMessage={state.error} />;
};

const OAuthEntryGate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  try {
    const hash = window.location.hash || "";
    const dismissed = localStorage.getItem("neatrix-welcome-dismissed") === "1";
    if (hash.includes("access_token") || hash.includes("refresh_token")) {
      const raw = hash.startsWith('#') ? hash.slice(1) : hash;
      const params = new URLSearchParams(raw);
      const type = params.get('type');
      const isAuthActionRoute = location.pathname === '/email-verification-success' || location.pathname === '/reset-password';
      const isSupabaseAction = type === 'signup' || type === 'recovery';
      if (!isAuthActionRoute && !isSupabaseAction) {
        navigate(dismissed ? "/dashboard" : "/welcome", { replace: true });
      }
    }
  } catch { void 0 }
  return null;
};

const App = () => {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <SupabaseDataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <StatusBannerHost />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogArticlePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/email-verification" element={<EmailVerificationPage />} />
                <Route path="/email-verification-success" element={<EmailVerificationSuccessPage />} />
                <Route path="/email-preview" element={<EmailPreview />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/book-service" element={<BookingPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/dashboard/*" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/test" element={<TestPage />} />
                {/* Admin routes removed from main app to avoid conflicts with real dashboard in /neatrixadmin */}
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <OAuthEntryGate />
            </BrowserRouter>
          </TooltipProvider>
        </SupabaseDataProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div style={{ 
        backgroundColor: 'red', 
        color: 'white', 
        padding: '20px', 
        fontSize: '18px',
        minHeight: '100vh'
      }}>
        <h1>Application Error</h1>
        <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Check the console for more details.</p>
      </div>
    );
  }
};

export default App;
