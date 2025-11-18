import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { FullScreenCleaningLoader } from '@/components/ui/CleaningLoader';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hash = window.location.hash?.startsWith('#') ? window.location.hash.slice(1) : '';
        const hashParams = new URLSearchParams(hash);
        const queryParams = new URLSearchParams(window.location.search);
        const type = hashParams.get('type') || queryParams.get('type');
        const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
        const errorDesc = hashParams.get('error_description') || queryParams.get('error_description') || hashParams.get('message') || queryParams.get('message');

        if (type === 'signup') {
          const target = '/email-verification-success' + window.location.search + window.location.hash;
          navigate(target, { replace: true });
          return;
        }

        if (type === 'recovery') {
          const target = '/reset-password' + window.location.search + window.location.hash;
          navigate(target, { replace: true });
          return;
        }

        // OAuth path: get the session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          console.log('✅ Google OAuth successful, user:', session.user);
          const dismissed = localStorage.getItem('neatrix-welcome-dismissed') === '1';
          navigate(dismissed ? '/dashboard' : '/welcome', { replace: true });
        } else {
          // No session found, redirect to login
          setError(errorDesc || 'Authentication failed. No session found.');
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (error: any) {
        console.error('❌ Auth callback error:', error);
        setError(error.message || 'Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (isLoading) {
    return <FullScreenCleaningLoader text="Completing authentication..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallbackPage;