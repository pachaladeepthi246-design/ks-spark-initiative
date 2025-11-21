-- Add social links to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS twitter_url text,
ADD COLUMN IF NOT EXISTS portfolio_url text;

-- Create user_activity table for analytics
CREATE TABLE IF NOT EXISTS public.user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  activity_data jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create user_favorites table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tool_id integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

-- Create tool_views table for analytics
CREATE TABLE IF NOT EXISTS public.tool_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id integer NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  viewed_at timestamp with time zone DEFAULT now()
);

-- Create categories table (if not exists)
CREATE TABLE IF NOT EXISTS public.categories (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  tools_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Create user_submissions table (if not exists)
CREATE TABLE IF NOT EXISTS public.user_submissions (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  link text NOT NULL,
  category text NOT NULL,
  logo_url text,
  status text DEFAULT 'pending',
  admin_notes text,
  submitted_at timestamp with time zone DEFAULT now(),
  reviewed_at timestamp with time zone
);

-- Enable RLS
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_activity
CREATE POLICY "Users can view own activity" ON public.user_activity
  FOR SELECT USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own activity" ON public.user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity" ON public.user_activity
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for user_favorites
CREATE POLICY "Users can manage own favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for tool_views
CREATE POLICY "Anyone can insert tool views" ON public.tool_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all tool views" ON public.tool_views
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for user_submissions
CREATE POLICY "Users can view own submissions" ON public.user_submissions
  FOR SELECT USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create submissions" ON public.user_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage submissions" ON public.user_submissions
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON public.user_activity(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_views_tool_id ON public.tool_views(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_views_viewed_at ON public.tool_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_status ON public.user_submissions(status);