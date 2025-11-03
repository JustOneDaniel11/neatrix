import { supabase } from './supabase';

/**
 * Sign in with Google OAuth
 * @returns Promise with the sign in result
 */
export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
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