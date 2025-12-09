import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { 
  Home, Bot, Briefcase, Palette, PenTool, Video, Code, 
  GraduationCap, TrendingUp, MessageSquare, Database, 
  ShoppingCart, Search, X, ChevronRight
} from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { cn } from '@/lib/utils'

interface Category {
  id: number
  name: string
  slug: string
  icon?: string
  tools_count: number | null
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const categoryIcons: Record<string, React.ElementType> = {
  'artificial-intelligence': Bot,
  'productivity': TrendingUp,
  'marketing': Briefcase,
  'design': Palette,
  'writing': PenTool,
  'video': Video,
  'developer-tools': Code,
  'education': GraduationCap,
  'chatbots': MessageSquare,
  'data-analysis': Database,
  'e-commerce': ShoppingCart,
  'research': Search,
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const currentCategory = searchParams.get('category')

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('tools_count', { ascending: false })

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (slug: string) => {
    const Icon = categoryIcons[slug] || Bot
    return Icon
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-40 transition-transform duration-300 overflow-y-auto",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute right-4 top-4 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Home link */}
          <Link
            to="/"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-4",
              location.pathname === '/' && !currentCategory
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Home className="h-5 w-5" />
            All Tools
          </Link>

          {/* Categories */}
          <div className="space-y-1">
            <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Categories
            </h3>
            
            {loading ? (
              <div className="space-y-2 px-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-8 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : (
              categories.map((category) => {
                const Icon = getIcon(category.slug)
                const isActive = currentCategory === category.slug
                
                return (
                  <Link
                    key={category.id}
                    to={`/?category=${category.slug}`}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{category.name}</span>
                    </div>
                    {category.tools_count && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {category.tools_count}
                      </span>
                    )}
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
