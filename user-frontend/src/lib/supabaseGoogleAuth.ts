import { supabase } from './supabase';

/**
 * Sign in with Google OAuth
 * @returns Promise with the sign in result
 */
export const signInWithGoogle = async () => {
  // Determine redirect URL based on current environment
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const redirectTo = isProduction 
    ? 'https://neatrix.site' 
    : 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Google sign-in error:', error.message);
  } else {
    console.log('Redirecting to Google OAuth...');
  }

  return { data, error };
};

/**
 * Get the current session
 * @returns Promise with the current session
 */
export const getSession = async () => {
  return await supabase.auth.getSession();
};

/**
 * Sign out the current user
 * @returns Promise with the sign out result
 */
export const signOut = async () => {
  return await supabase.auth.signOut();
};