import { supabase } from './supabase';

export async function deletePost(postId: string) {
  try {
    // First try with normal client
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);
    
    if (error) {
      console.error('Delete failed with normal client:', error);
      throw error;
    }
    
    return { success: true };
  } catch (err) {
    console.error('Delete post error:', err);
    return { success: false, error: err };
  }
}