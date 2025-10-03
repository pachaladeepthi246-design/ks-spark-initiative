import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  checkAdminStatus: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin email addresses (in production, this would be in database)
const ADMIN_EMAILS = [
  'admin@dejob.com',
  'hr@techcorp.com',
  'recruiter@dataflow.io'
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Load user on mount (one-time check)
  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) {
          await checkAdminStatus(user)
        }
      } finally {
        setLoading(false)
      }
    }
    loadUser()

    // Set up auth listener - KEEP SIMPLE, avoid async operations in callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // NEVER use any async operations in callback
        const newUser = session?.user || null
        setUser(newUser)
        if (newUser) {
          checkAdminStatus(newUser)
        } else {
          setIsAdmin(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function checkAdminStatus(userToCheck?: User) {
    const currentUser = userToCheck || user
    if (!currentUser?.email) {
      setIsAdmin(false)
      return false
    }
    
    const adminStatus = ADMIN_EMAILS.includes(currentUser.email)
    setIsAdmin(adminStatus)
    return adminStatus
  }

  // Auth methods
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    // Create profile after successful signup
    if (data.user && !error) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName
      })
    }

    return { error }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, signOut, checkAdminStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}