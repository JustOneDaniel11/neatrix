import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Tag,
  BookOpen,
  TrendingUp,
  Heart,
  Share2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { blogPosts as dataPosts, categories as dataCategories } from "@/data/blogPosts";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState(dataPosts);
  const [categories, setCategories] = useState(
    dataCategories.map((c) => ({ ...c, count: 0 }))
  );

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const { data: catData, error: catError } = await supabase
          .from('blog_categories')
          .select('id, name, slug');

        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('id, slug, title, excerpt, author, content, featured_image_url, category_id, created_at, status')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (catError) console.warn('Categories fetch error:', catError.message);
        if (postError) console.warn('Posts fetch error:', postError.message);

        if (isMounted) {
          const adaptedPosts = (postData || []).map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt || '',
            author: p.author || 'Neatrix',
            date: new Date(p.created_at).toLocaleDateString(),
            readTime: Math.max(1, Math.round(((p.content || '').split(/\s+/).length) / 200)) + ' min read',
            category: p.category_id || 'all',
            featured: false,
            image: p.featured_image_url || '/images/blog/diy-cleaning.svg',
            likes: 0,
            shares: 0,
            tags: [],
          }));

          const cats = [{ id: 'all', label: 'All Posts' }, ...
            (catData || []).map((c: any) => ({ id: c.id, label: c.name }))
          ];

          const catsWithCounts = cats.map((c) => ({
            ...c,
            count: c.id === 'all'
              ? adaptedPosts.length
              : adaptedPosts.filter((p) => p.category === c.id).length,
          }));

          setBlogPosts(adaptedPosts.length ? adaptedPosts : dataPosts);
          setCategories(catsWithCounts);
        }
      } catch (err) {
        console.warn('Blog fetch error:', err);
        if (isMounted) {
          const catsWithCounts = dataCategories.map((c) => ({
            ...c,
            count: c.id === 'all'
              ? dataPosts.length
              : dataPosts.filter((p) => p.category === c.id).length,
          }));
          setCategories(catsWithCounts);
          setBlogPosts(dataPosts);
        }
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Cleaning Tips & Insights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert advice, practical tips, and professional insights to help you maintain 
            spotless spaces. From stain removal hacks to fabric care guides, we share our 
            knowledge to empower you.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-gradient-primary shadow-medium" 
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "all" && searchTerm === "" && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-card-foreground mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Featured Articles
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all group cursor-pointer" onClick={() => navigate(`/blog/${post.slug}`)}>
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h4 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            {post.shares}
                          </div>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-card-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              {selectedCategory === "all" ? "All Articles" : categories.find(c => c.id === selectedCategory)?.label}
            </h3>
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all group cursor-pointer" onClick={() => navigate(`/blog/${post.slug}`)}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    {post.featured && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="block">
                      <h4 className="font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          {post.shares}
                        </div>
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary text-xs">
                          Read
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Stay Updated with Cleaning Tips
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest cleaning tips, stain removal hacks, 
              and exclusive offers delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-gradient-primary shadow-medium hover:shadow-strong">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Blog;
