import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AdminProvider } from './contexts/AdminContext';
import { SupabaseDataProvider } from './contexts/SupabaseDataContext';
import AuthGuard from './components/AuthGuard';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginAdvanced from './pages/AdminLoginAdvanced';
import AdminResetPassword from './pages/AdminResetPassword';
import './index.css';
import { Toaster } from './components/ui/toaster';

// Error boundary for development errors
class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, { hasError: boolean; error: any; errorInfo: any }> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ errorInfo });
    console.error('Error caught by boundary:', error, errorInfo);
    if (error.name === 'NotFoundError' && error.message.includes('removeChild')) {
      console.warn('DOM manipulation error detected - attempting graceful recovery');
    }
  }

  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI here
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = document.getElementById('admin-root');
if (!root) {
  throw new Error('Admin root element #admin-root not found');
}

// Normalize preview entry path: if loaded via /admin.html, redirect to /admin/overview
try {
  const { pathname } = window.location;
  if (pathname.endsWith('/admin.html')) {
    window.history.replaceState(null, '', '/admin/overview');
  }
} catch {}

ReactDOM.createRoot(root).render(
  <ErrorBoundary>
    <DarkModeProvider>
      <SupabaseDataProvider>
        <AdminProvider>
          <Router basename="/admin">
            <Routes>
              {/* Login routes - unprotected */}
              <Route path="/" element={<AdminLoginAdvanced />} />
              <Route path="/admin-login" element={<AdminLoginAdvanced />} />
              <Route path="/reset-password" element={<AdminResetPassword />} />
              
              {/* Protected routes nested under AdminLayout */}
              <Route element={<AuthGuard redirectTo="/admin-login"><AdminLayout /></AuthGuard>}>
                <Route path="/overview" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/bookings" element={<AdminDashboard />} />
                <Route path="/orders" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminDashboard />} />
                <Route path="/customers" element={<AdminDashboard />} />
                <Route path="/contacts" element={<AdminDashboard />} />
                <Route path="/contact-message" element={<AdminDashboard />} />
                <Route path="/notifications" element={<AdminDashboard />} />
                <Route path="/payments" element={<AdminDashboard />} />
                <Route path="/subscriptions" element={<AdminDashboard />} />
                <Route path="/laundry" element={<AdminDashboard />} />
                <Route path="/laundry-orders" element={<AdminDashboard />} />
                <Route path="/tracking" element={<AdminDashboard />} />
                <Route path="/order-tracking" element={<AdminDashboard />} />
                <Route path="/delivery" element={<AdminDashboard />} />
                <Route path="/pickup-delivery" element={<AdminDashboard />} />
                <Route path="/reviews" element={<AdminDashboard />} />
                <Route path="/reviews-feedback" element={<AdminDashboard />} />
                <Route path="/posts" element={<AdminDashboard />} />
                <Route path="/livechat" element={<AdminDashboard />} />
                <Route path="/live-chat" element={<AdminDashboard />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/admin-login" replace />} />
            </Routes>
            <Toaster />
          </Router>
        </AdminProvider>
      </SupabaseDataProvider>
    </DarkModeProvider>
  </ErrorBoundary>
);
