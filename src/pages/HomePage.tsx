import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Grid, List, Filter } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import ToolCard from '@/components/ToolCard'

interface Tool {
  id: number
  name: string
  description: string
  link: string
  category: string
  logo_url?: string
  featured: boolean
  popularity_score: number
  created_at?: string
  tags?: string[]
}

type SortOption = 'popularity' | 'alphabetical' | 'newest'
type ViewMode = 'grid' | 'list'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  
  const category = searchParams.get('category')

  useEffect(() => {
    loadTools()
  }, [category])

  async function loadTools() {
    setLoading(true)
    try {
      let query = supabase
        .from('tools')
        .select('*')
        .order('popularity_score', { ascending: false })
        .limit(100)

      if (category) {
        query = query.ilike('category', `%${category.replace('-', ' ')}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setTools(data || [])
    } catch (error) {
      console.error('Error loading tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTools = tools.filter(tool => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    )
  }).sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name)
      case 'newest':
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      default:
        return (b.popularity_score || 0) - (a.popularity_score || 0)
    }
  })

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        {!category && !searchQuery && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Discover the Best AI Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of 1000+ AI tools for productivity, design, marketing, and more.
            </p>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="alphabetical">A-Z</option>
            </select>
            
            <div className="flex border border-input rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Tools`
              : 'All AI Tools'
            }
            <span className="text-muted-foreground font-normal ml-2">
              ({filteredTools.length})
            </span>
          </h2>
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
