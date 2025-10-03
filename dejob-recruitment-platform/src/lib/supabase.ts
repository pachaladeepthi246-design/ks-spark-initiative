import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbpnhoyigkffqorryzxl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndicG5ob3lpZ2tmZnFvcnJ5enhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTg0NzksImV4cCI6MjA3MTY3NDQ3OX0.NeOfMctlVJfxsB3qTBJ7c8tNMPucIND-7CRHOUqOce8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Job {
  id: string
  title: string
  description: string
  company_id: string
  location: string
  salary_range: string | null
  job_type: string
  industry: string
  experience_level: string
  skills_required: string[]
  posted_date: string
  deadline: string | null
  status: string
  featured: boolean
  remote_friendly: boolean
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  website: string | null
  industry: string | null
  company_size: string | null
  location: string | null
  founded_year: number | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  location: string | null
  experience_level: string | null
  skills: string[]
  resume_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  user_id: string
  cover_letter: string | null
  status: string
  applied_date: string
  resume_url: string | null
  created_at: string
  updated_at: string
}