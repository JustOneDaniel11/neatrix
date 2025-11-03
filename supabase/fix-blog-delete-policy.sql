-- Fix Blog Posts Delete RLS Policy
-- This script adds a policy to allow deleting blog posts

-- Enable RLS if not already enabled
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing delete policy if it exists
DROP POLICY IF EXISTS "allow_delete_posts" ON public.blog_posts;

-- Create a permissive delete policy for authenticated users
CREATE POLICY "allow_delete_posts" 
  ON public.blog_posts 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'blog_posts'
ORDER BY policyname;