import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts as dataPosts } from "@/data/blogPosts";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, excerpt, author, content, featured_image_url, created_at, status')
          .eq('slug', slug)
          .eq('status', 'published')
          .limit(1)
          .maybeSingle();

        if (error) console.warn('Post fetch error:', error.message);
        if (isMounted) {
          if (data) {
            setPost({
              id: data.id,
              slug: data.slug,
              title: data.title,
              excerpt: data.excerpt || '',
              author: data.author || 'Neatrix',
              date: new Date(data.created_at).toLocaleDateString(),
              readTime: Math.max(1, Math.round(((data.content || '').split(/\s+/).length) / 200)) + ' min read',
              image: data.featured_image_url || '/images/blog/diy-cleaning.svg',
              tags: [],
              content: data.content || '',
            });
          } else {
            const fallback = dataPosts.find((p) => p.slug === slug);
            setPost(fallback || null);
          }
        }
      } catch (err) {
        console.warn('Single post fetch error:', err);
        if (isMounted) {
          const fallback = dataPosts.find((p) => p.slug === slug);
          setPost(fallback || null);
        }
      }
    }
    fetchPost();
    return () => { isMounted = false; };
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog article you’re looking for doesn’t exist or may have been moved.
            </p>
            <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>

          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6 text-sm">
            <span className="inline-flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>

          <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="w-full h-64 object-cover rounded-lg mb-8" />

          <div className="prose prose-neutral max-w-none">
            {typeof post.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              post.sections?.map((section: any, idx: number) => (
                <section key={idx} className="mb-8">
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs?.map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
