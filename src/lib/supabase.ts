import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database Types
export interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  plan_type: 'free' | 'pro' | 'enterprise'
  credits_used: number
  credits_limit: number
  created_at: string
  updated_at: string
}

export interface Tool {
  id: string
  title: string
  description?: string
  icon?: string
  status: 'active' | 'beta' | 'new' | 'maintenance'
  color?: string
  category?: string
  config?: Record<string, any>
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface ContentItem {
  id: string
  user_id: string
  tool_id?: string
  name: string
  type: 'text' | 'image' | 'video' | 'audio' | 'code' | 'data'
  file_url?: string
  file_size?: number
  metadata?: Record<string, any>
  is_favorite: boolean
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  user_id: string
  tool_id?: string
  action: string
  details?: Record<string, any>
  credits_used: number
  created_at: string
}

export interface UserToolConfig {
  id: string
  user_id: string
  tool_id: string
  config: Record<string, any>
  created_at: string
  updated_at: string
}
