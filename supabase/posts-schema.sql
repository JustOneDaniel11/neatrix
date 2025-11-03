-- Blog Posts and Categories Schema for Neatrix
-- Run in Supabase SQL Editor. Creates tables and dev-friendly RLS policies.

-- 1) Categories table
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT, -- HTML content
  author TEXT DEFAULT 'Neatrix',
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  featured_image_url TEXT,
  meta_description TEXT,
  featured_keyphrase TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- 4) RLS enable
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 5) Dev read-all policies (SAFE)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_categories' AND policyname='dev_read_all'
  ) THEN
    CREATE POLICY "dev_read_all" ON public.blog_categories FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_posts' AND policyname='dev_read_all'
  ) THEN
    CREATE POLICY "dev_read_all" ON public.blog_posts FOR SELECT USING (true);
  END IF;
END $$;

-- 6) Dev write policies for authenticated (optional)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_categories' AND policyname='dev_write_authenticated'
  ) THEN
    CREATE POLICY "dev_write_authenticated" ON public.blog_categories FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_categories' AND policyname='dev_update_authenticated'
  ) THEN
    CREATE POLICY "dev_update_authenticated" ON public.blog_categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_posts' AND policyname='dev_write_authenticated'
  ) THEN
    CREATE POLICY "dev_write_authenticated" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blog_posts' AND policyname='dev_update_authenticated'
  ) THEN
    CREATE POLICY "dev_update_authenticated" ON public.blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 7) Updated_at triggers
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_categories_updated_at ON public.blog_categories;
CREATE TRIGGER trg_blog_categories_updated_at BEFORE UPDATE ON public.blog_categories
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- 8) Seed example categories
INSERT INTO public.blog_categories (name, slug)
VALUES ('Cleaning Tips', 'cleaning-tips'), ('Laundry', 'laundry'), ('Fabric Care', 'fabric-care')
ON CONFLICT (slug) DO NOTHING;

-- 9) Storage bucket for featured images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read, authenticated write
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='blog_images_public_read'
  ) THEN
    CREATE POLICY "blog_images_public_read" ON storage.objects FOR SELECT
      USING (bucket_id = 'blog-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='blog_images_authenticated_write'
  ) THEN
    CREATE POLICY "blog_images_authenticated_write" ON storage.objects FOR INSERT TO authenticated
      WITH CHECK (bucket_id = 'blog-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='blog_images_authenticated_update'
  ) THEN
    CREATE POLICY "blog_images_authenticated_update" ON storage.objects FOR UPDATE TO authenticated
      USING (bucket_id = 'blog-images') WITH CHECK (bucket_id = 'blog-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='blog_images_authenticated_delete'
  ) THEN
    CREATE POLICY "blog_images_authenticated_delete" ON storage.objects FOR DELETE TO authenticated
      USING (bucket_id = 'blog-images');
  END IF;
END $$;
