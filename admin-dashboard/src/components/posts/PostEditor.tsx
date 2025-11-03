import React, { useEffect, useMemo, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Image as ImageIcon, Save, UploadCloud, CheckCircle2, AlertTriangle, Tag, Type, FileText, Link as LinkIcon, Bold, Italic, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, Quote, Code, Eye, EyeOff } from 'lucide-react';

type BlogCategory = { id: string; name: string; slug: string };

type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  author?: string;
  featured_image_url?: string;
  status: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
  category_id?: string | null;
  meta_description?: string;
  featured_keyphrase?: string;
  content?: string; // HTML
};

interface PostEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSaved: (post: BlogPost) => void;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function PostEditor({ post, onClose, onSaved }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [categoryId, setCategoryId] = useState<string | undefined | null>(post?.category_id || null);
  const [content, setContent] = useState<string>(post?.content || '');
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '');
  const [featuredKeyphrase, setFeaturedKeyphrase] = useState(post?.featured_keyphrase || '');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || '');
  const [author, setAuthor] = useState(post?.author || 'Neatrix');
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Handle window resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [visualContent, setVisualContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const visualEditorRef = useRef<HTMLDivElement>(null);

  const isEditing = Boolean(post?.id);

  // Convert between visual and code modes
  useEffect(() => {
    if (editorMode === 'visual') {
      setVisualContent(content);
    }
  }, [editorMode, content]);

  // Force LTR direction when switching to visual mode and on mount
  useEffect(() => {
    if (editorMode === 'visual' && visualEditorRef.current) {
      const editor = visualEditorRef.current;
      editor.setAttribute('dir', 'ltr');
      editor.style.direction = 'ltr';
      editor.style.textAlign = 'left';
      editor.style.unicodeBidi = 'plaintext';
      
      // Also apply to all child elements
      const childElements = editor.querySelectorAll('*');
      childElements.forEach((el: HTMLElement) => {
        el.style.direction = 'ltr';
        el.style.textAlign = 'left';
        el.style.unicodeBidi = 'plaintext';
      });

      // Add paste event listener to clean up RTL content
      const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const clipboardData = e.clipboardData || (window as any).clipboardData;
        const html = clipboardData?.getData('text/html') || '';
        const text = clipboardData?.getData('text/plain') || '';
        
        let cleanedContent = html || text;
        
        // Clean RTL directives and unwanted alignment
        cleanedContent = cleanedContent
          .replace(/dir=(["']?)rtl\1/gi, '')
          .replace(/style=(["']?)[^"']*text-align:[^;"']*;?[^"']*\1/gi, '')
          .replace(/text-align:\s*[^;\s]*;?/gi, '')
          .replace(/direction:\s*[^;\s]*;?/gi, '');
        
        document.execCommand('insertHTML', false, cleanedContent);
      };

      editor.addEventListener('paste', handlePaste);
      
      // Cleanup function
      return () => {
        editor.removeEventListener('paste', handlePaste);
      };
    }
  }, [editorMode]);

  const applyFormat = (tag: string, attributes?: Record<string, string>) => {
    if (editorMode === 'code' && contentRef.current) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const selectedText = content.substring(start, end);
      const attrStr = attributes ? ' ' + Object.entries(attributes).map(([k, v]) => `${k}="${v}"`).join(' ') : '';
      const formatted = `<${tag}${attrStr}>${selectedText}</${tag}>`;
      const newContent = content.substring(0, start) + formatted + content.substring(end);
      setContent(newContent);
      
      // Restore cursor position
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.selectionStart = start + formatted.length;
          contentRef.current.selectionEnd = start + formatted.length;
          contentRef.current.focus();
        }
      }, 0);
    }
  };

  const applyHeading = (level: number) => {
    applyFormat(`h${level}`);
  };

  const applyAlignment = (alignment: string) => {
    applyFormat('p', { style: `text-align: ${alignment}` });
  };

  const handleVisualContentChange = (html: string) => {
    setVisualContent(html);
    // Convert visual content back to HTML for storage
    setContent(html);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });
      if (error) {
        console.error('Failed to fetch categories:', error);
      } else {
        setCategories(data as BlogCategory[]);
      }
    };
    loadCategories();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) setSlug(slugify(val));
  };

  const uploadImage = async (file: File) => {
    setError(null);
    setSuccess(null);
    try {
      const ext = file.name.split('.').pop() || 'png';
      const path = `featured/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
      setFeaturedImageUrl(data.publicUrl);
      setSuccess('Image uploaded successfully');
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError('Image upload failed. Ensure a storage bucket "blog-images" exists and is public.');
    }
  };

  const savePost = async (status: 'draft' | 'published') => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload: BlogPost = {
        slug: slug || slugify(title),
        title,
        excerpt,
        author,
        featured_image_url: featuredImageUrl || null as any,
        status,
        category_id: categoryId || null,
        meta_description: metaDescription,
        featured_keyphrase: featuredKeyphrase,
        content,
      };

      let dataRes: any = null;
      if (isEditing && post?.id) {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', post.id)
          .select()
          .single();
        if (error) throw error;
        dataRes = data;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        dataRes = data;
      }

      setSuccess(status === 'published' ? 'Post published successfully' : 'Draft saved successfully');
      onSaved(dataRes as BlogPost);
    } catch (err: any) {
      console.error('Save failed:', err);
      setError(err?.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const addCategory = async () => {
    setShowCategoryModal(true);
    setNewCategoryName('');
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setShowCategoryModal(false);
      return;
    }
    
    setAddingCategory(true);
    const name = newCategoryName.trim();
    const slug = slugify(name);
    
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .insert([{ name, slug }])
        .select()
        .single();
      if (error) throw error;
      setCategories(prev => [...prev, data as BlogCategory]);
      setCategoryId(data.id);
      setShowCategoryModal(false);
      setNewCategoryName('');
    } catch (err) {
      console.error('Add category failed:', err);
      setError('Failed to add category. It may already exist.');
    } finally {
      setAddingCategory(false);
    }
  };

  const cancelAddCategory = () => {
    setShowCategoryModal(false);
    setNewCategoryName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> {isEditing ? 'Edit Post' : 'Create New Post'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Classic editor layout for managing blog content</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4" /> Back to Posts
            </button>
          </div>
        </div>
        {(error || success) && (
          <div className="mt-3">
            {error && <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><AlertTriangle className="w-4 h-4" /> {error}</div>}
            {success && <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm"><CheckCircle2 className="w-4 h-4" /> {success}</div>}
          </div>
        )}
      </div>

      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 md:p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="Enter post title" className="w-full px-3 md:px-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm md:text-base" />
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Slug</label>
              <div className="flex items-center gap-2">
                <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="post-slug" className="flex-1 px-3 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm" />
                <button onClick={() => setSlug(slugify(title))} className="px-2 md:px-3 py-1.5 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs whitespace-nowrap">Generate</button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">Editor Mode:</div>
                <button
                  onClick={() => setEditorMode(editorMode === 'visual' ? 'code' : 'visual')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs"
                >
                  {editorMode === 'visual' ? <Code className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {editorMode === 'visual' ? 'Code View' : 'Visual View'}
                </button>
              </div>
            </div>

            {editorMode === 'code' ? (
              <>
                {/* Formatting Toolbar for Code Mode */}
                <div className="flex flex-wrap gap-1 mb-3 p-2 bg-gray-50 dark:bg-gray-900 rounded-md border dark:border-gray-700">
                  <button onClick={() => applyFormat('strong')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Bold"><Bold className="w-4 h-4" /></button>
                  <button onClick={() => applyFormat('em')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Italic"><Italic className="w-4 h-4" /></button>
                  <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6"></div>
                  <button onClick={() => applyHeading(1)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Heading 1">H1</button>
                  <button onClick={() => applyHeading(2)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Heading 2">H2</button>
                  <button onClick={() => applyHeading(3)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Heading 3">H3</button>
                  <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6"></div>
                  <button onClick={() => applyAlignment('left')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                  <button onClick={() => applyAlignment('center')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                  <button onClick={() => applyAlignment('right')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                  <button onClick={() => applyAlignment('justify')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Justify"><AlignJustify className="w-4 h-4" /></button>
                  <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6"></div>
                  <button onClick={() => applyFormat('blockquote')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Blockquote"><Quote className="w-4 h-4" /></button>
                  <button onClick={() => applyFormat('ul')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" title="Bullet List"><List className="w-4 h-4" /></button>
                </div>
                
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write post content here (HTML supported, e.g., <p><strong>Bold</strong> text</p>)"
                  rows={16}
                  className="w-full px-4 py-3 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
                />
              </>
            ) : (
              /* Visual Editor Mode */
              <div className="border dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 min-h-[300px]">
                <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 overflow-x-auto whitespace-nowrap">
                  <button onClick={() => applyFormat('strong')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Bold"><Bold className="w-4 h-4" /></button>
                  <button onClick={() => applyFormat('em')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Italic"><Italic className="w-4 h-4" /></button>
                  <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6 hidden sm:block"></div>
                  <select className="p-1.5 rounded bg-white dark:bg-gray-900 border dark:border-gray-700 text-sm min-w-[90px]" onChange={e => {
                    const level = parseInt(e.target.value);
                    if (level === 0) applyFormat('p');
                    else applyHeading(level);
                  }}>
                    <option value="0">Paragraph</option>
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                  </select>
                  <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6 hidden sm:block"></div>
                  <button onClick={() => applyAlignment('left')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                  <button onClick={() => applyAlignment('center')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                  <button onClick={() => applyAlignment('right')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                  <button onClick={() => applyAlignment('justify')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Justify"><AlignJustify className="w-4 h-4" /></button>
                  <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6 hidden sm:block"></div>
                  <button onClick={() => applyFormat('blockquote')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Blockquote"><Quote className="w-4 h-4" /></button>
                  <button onClick={() => applyFormat('ul')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation" title="Bullet List"><List className="w-4 h-4" /></button>
                </div>
                <div
                  ref={visualEditorRef}
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: visualContent }}
                  onInput={(e) => handleVisualContentChange(e.currentTarget.innerHTML)}
                  className="p-4 min-h-[250px] prose dark:prose-invert max-w-none focus:outline-none"
                  style={{ 
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif', 
                    direction: 'ltr',
                    textAlign: 'left',
                    unicodeBidi: 'plaintext'
                  }}
                  dir="ltr"
                />
              </div>
            )}

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short summary shown in list" rows={3} className="w-full px-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Settings column */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
              <ImageIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            {featuredImageUrl ? (
              <img src={featuredImageUrl} alt="Featured" className="w-full h-40 object-cover rounded-md border dark:border-gray-700" />
            ) : (
              <div className="w-full h-40 border-2 border-dashed rounded-md flex items-center justify-center text-gray-400 dark:text-gray-500">No image selected</div>
            )}
            <input type="file" accept="image/*" className="mt-3" onChange={e => e.target.files && uploadImage(e.target.files[0])} />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Uploads to Supabase bucket <code>blog-images</code>.</div>
          </div>

          {/* Category & Author */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <div className="flex items-center gap-2">
                <select value={categoryId || ''} onChange={e => setCategoryId(e.target.value || null)} className="flex-1 px-3 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option value="">— None —</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button onClick={addCategory} className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Add New</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
              <input value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-3 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Default "Neatrix"</div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
              <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Featured Keyphrase</label>
              <input value={featuredKeyphrase} onChange={e => setFeaturedKeyphrase(e.target.value)} className="w-full px-3 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button disabled={saving} onClick={() => savePost('draft')} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button disabled={saving} onClick={() => savePost('published')} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                <CheckCircle2 className="w-4 h-4" /> Publish
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Publishing makes the post immediately visible on the user blog.</div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-3 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelAddCategory}
                className="px-4 py-2 rounded-md border bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={addingCategory || !newCategoryName.trim()}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingCategory ? 'Adding...' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const applyFormat = (format: string) => {
  if (editorMode === 'code') {
    const textarea = contentRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'strong':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'em':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'blockquote':
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        break;
      case 'ul':
        formattedText = `<ul><li>${selectedText}</li></ul>`;
        break;
      case 'p':
        formattedText = `<p>${selectedText}</p>`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  } else {
    // Visual editor formatting
    const editor = visualEditorRef.current;
    if (!editor) return;
    
    document.execCommand(format, false, null);
    handleVisualContentChange(editor.innerHTML);
  }
};

const applyHeading = (level: number) => {
  if (editorMode === 'code') {
    const textarea = contentRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    const formattedText = `<h${level}>${selectedText}</h${level}>`;
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  } else {
    const editor = visualEditorRef.current;
    if (!editor) return;
    
    document.execCommand('formatBlock', false, `h${level}`);
    handleVisualContentChange(editor.innerHTML);
  }
};

const applyAlignment = (alignment: string) => {
  if (editorMode === 'code') {
    const textarea = contentRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    const formattedText = `<div style="text-align: ${alignment};">${selectedText}</div>`;
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  } else {
    const editor = visualEditorRef.current;
    if (!editor) return;
    
    document.execCommand('justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1), false, null);
    handleVisualContentChange(editor.innerHTML);
  }
};

const handleVisualContentChange = (html: string) => {
  setVisualContent(html);
  setContent(html); // Keep both editors in sync
};