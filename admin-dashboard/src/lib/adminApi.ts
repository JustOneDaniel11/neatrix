import { createClient } from '@supabase/supabase-js';

// Create a service role client with admin privileges
const adminClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_KEY || import.meta.env.VITE_SUPABASE_ADMIN_KEY
);

export async function deletePost(postId: string) {
  try {
    const { error } = await adminClient
      .from('blog_posts')
      .delete()
      .eq('id', postId);
    
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Admin delete post error:', err);
    return { success: false, error: err };
  }
}