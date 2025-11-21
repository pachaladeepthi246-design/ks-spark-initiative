import { createClient } from '@supabase/supabase-js'



// Database types
export interface Tool {
  id: number
  name: string
  description: string
  link: string
  category: string
  logo_url?: string
  screenshot_url?: string
  featured: boolean
  popularity_score: number
  source?: string
  created_at?: string
  updated_at?: string
  tags?: string[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  tools_count: number
  created_at?: string
}

export interface UserProfile {
  id: string
  email?: string
  full_name?: string
  phone?: string
  avatar_url?: string
  bio?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  portfolio_url?: string
  created_at?: string
  updated_at?: string
}

export interface UserSubmission {
  id: number
  user_id?: string
  name: string
  description: string
  link: string
  category: string
  logo_url?: string
  status: 'pending' | 'approved' | 'rejected'
  admin_notes?: string
  submitted_at?: string
  reviewed_at?: string
}

export interface UserFavorite {
  id: number
  user_id: string
  tool_id: number
  created_at?: string
}