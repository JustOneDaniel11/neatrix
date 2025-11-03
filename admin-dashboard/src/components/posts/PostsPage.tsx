import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, FileText, AlertTriangle, RefreshCcw } from 'lucide-react';

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  author?: string;
  featured_image_url?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  category_id?: string | null;
  category?: BlogCategory | null;
};

interface PostsPageProps {
  onCreateNew: () => void;
  onEditPost: (post: BlogPost) => void;
  refreshKey?: number;
}

export default function PostsPage({ onCreateNew, onEditPost, refreshKey }: PostsPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories:category_id(id,name,slug)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const normalized = (data || []).map((row: any) => ({
        ...row,
        category: row.blog_categories || null,
      })) as BlogPost[];
      setPosts(normalized);
    } catch (err: any) {
      const msg = err?.message || 'Failed to load posts';
      setError(msg);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

  const handleDelete = async (post: BlogPost) => {
    const ok = window.confirm(`Delete post "${post.title}"? This cannot be undone.`);
    if (!ok) return;
    
    try {
      // Direct approach using authenticated supabase client
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);
      
      if (error) {
        console.error('Delete failed:', error);
        throw error;
      }
      
      // Update UI immediately on success
      setPosts(prev => prev.filter(p => p.id !== post.id));
      
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete post. Please check your permissions and try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Posts Management
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create, edit, publish and delete blog posts</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchPosts}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" /> Create New Post
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Blog Posts</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button onClick={fetchPosts} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <RefreshCcw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button onClick={onCreateNew} className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 text-sm sm:text-base">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Created</th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr><td className="px-6 py-4 text-sm" colSpan={5}>Loading posts...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td className="px-6 py-10 text-sm text-gray-500 dark:text-gray-400" colSpan={5}>No posts found. Click "Create New Post" to add one.</td></tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden mt-1">
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      {post.category?.name || '—'}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEditPost(post)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
