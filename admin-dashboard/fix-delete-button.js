// Fix delete button by adding a direct delete function
import { supabase } from './src/lib/supabase';

// This function will be called from the PostsPage component
export async function deletePostDirectly(postId) {
  try {
    // First try with normal client
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);
    
    if (error) {
      console.error('Delete failed:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (err) {
    console.error('Delete post error:', err);
    return { success: false, error: err };
  }
}