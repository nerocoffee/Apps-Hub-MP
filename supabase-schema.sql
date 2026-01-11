-- Apps Hub Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
  credits_used INTEGER DEFAULT 0,
  credits_limit INTEGER DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tools table
CREATE TABLE public.tools (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'beta', 'new', 'maintenance')),
  color TEXT,
  category TEXT,
  config JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Content/Files table
CREATE TABLE public.content_library (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tool_id TEXT REFERENCES public.tools(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'video', 'audio', 'code', 'data')),
  file_url TEXT,
  file_size BIGINT,
  metadata JSONB DEFAULT '{}',
  is_favorite BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Activity/Usage tracking table
CREATE TABLE public.activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tool_id TEXT REFERENCES public.tools(id),
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tool configurations per user
CREATE TABLE public.user_tool_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tool_id TEXT REFERENCES public.tools(id),
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, tool_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_content_library_user_id ON public.content_library(user_id);
CREATE INDEX idx_content_library_tool_id ON public.content_library(tool_id);
CREATE INDEX idx_content_library_created_at ON public.content_library(created_at DESC);
CREATE INDEX idx_activities_user_id ON public.activities(user_id);
CREATE INDEX idx_activities_tool_id ON public.activities(tool_id);
CREATE INDEX idx_activities_created_at ON public.activities(created_at DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tool_configs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Content library policies
CREATE POLICY "Users can view their own content"
  ON public.content_library FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content"
  ON public.content_library FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content"
  ON public.content_library FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content"
  ON public.content_library FOR DELETE
  USING (auth.uid() = user_id);

-- Activities policies
CREATE POLICY "Users can view their own activities"
  ON public.activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
  ON public.activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User tool configs policies
CREATE POLICY "Users can view their own tool configs"
  ON public.user_tool_configs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tool configs"
  ON public.user_tool_configs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tool configs"
  ON public.user_tool_configs FOR UPDATE
  USING (auth.uid() = user_id);

-- Tools are publicly readable
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tools are viewable by everyone"
  ON public.tools FOR SELECT
  USING (is_public = true);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_tools
  BEFORE UPDATE ON public.tools
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_content_library
  BEFORE UPDATE ON public.content_library
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_user_tool_configs
  BEFORE UPDATE ON public.user_tool_configs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default tools data
INSERT INTO public.tools (id, title, description, icon, status, color, category) VALUES
  ('writer', 'Creative Writing Assistant', 'Generate blog posts, stories, and marketing copy with advanced AI models.', 'PenTool', 'active', 'bg-purple-500', 'content'),
  ('ocr', 'Image OCR Tool', 'Extract text from images and documents with high precision.', 'ImageIcon', 'active', 'bg-blue-500', 'image'),
  ('code', 'Code Generator', 'Convert natural language to production-ready code in multiple languages.', 'Code2', 'beta', 'bg-emerald-500', 'development'),
  ('data', 'Data Analyzer', 'Visualize complex datasets and generate actionable insights instantly.', 'BarChart3', 'new', 'bg-amber-500', 'analytics'),
  ('video', 'Video Editor', 'Automated video trimming, captioning, and enhancement tools.', 'Video', 'active', 'bg-rose-500', 'media'),
  ('audio', 'Audio Transcriber', 'Convert speech to text with speaker detection and timestamping.', 'Mic', 'active', 'bg-cyan-500', 'audio')
ON CONFLICT (id) DO NOTHING;
