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
} catch { void 0 }

ReactDOM.createRoot(root).render(
  <ErrorBoundary>
    <DarkModeProvider>
      <SupabaseDataProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Login routes - unprotected */}
              <Route path="/admin-login" element={<AdminLoginAdvanced />} />
              <Route path="/reset-password" element={<AdminResetPassword />} />
              
              {/* Protected routes nested under AdminLayout */}
              <Route element={<AuthGuard redirectTo="/admin-login"><AdminLayout /></AuthGuard>}>
                <Route path="/admin/overview" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/bookings" element={<AdminDashboard />} />
                <Route path="/admin/orders" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminDashboard />} />
                <Route path="/admin/customers" element={<AdminDashboard />} />
                <Route path="/admin/contacts" element={<AdminDashboard />} />
                <Route path="/admin/contact-message" element={<AdminDashboard />} />
                <Route path="/admin/notifications" element={<AdminDashboard />} />
                <Route path="/admin/payments" element={<AdminDashboard />} />
                <Route path="/admin/subscriptions" element={<AdminDashboard />} />
                <Route path="/admin/laundry" element={<AdminDashboard />} />
                <Route path="/admin/laundry-orders" element={<AdminDashboard />} />
                <Route path="/admin/tracking" element={<AdminDashboard />} />
                <Route path="/admin/order-tracking" element={<AdminDashboard />} />
                <Route path="/admin/delivery" element={<AdminDashboard />} />
                <Route path="/admin/pickup-delivery" element={<AdminDashboard />} />
                <Route path="/admin/reviews" element={<AdminDashboard />} />
                <Route path="/admin/reviews-feedback" element={<AdminDashboard />} />
                <Route path="/admin/posts" element={<AdminDashboard />} />
                <Route path="/admin/livechat" element={<AdminDashboard />} />
                <Route path="/admin/live-chat" element={<AdminDashboard />} />
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
