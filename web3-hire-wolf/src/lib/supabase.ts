import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbpnhoyigkffqorryzxl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndicG5ob3lpZ2tmZnFvcnJ5enhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTg0NzksImV4cCI6MjA3MTY3NDQ3OX0.NeOfMctlVJfxsB3qTBJ7c8tNMPucIND-7CRHOUqOce8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)