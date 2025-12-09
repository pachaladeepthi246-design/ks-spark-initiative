import React from 'react'
import { ExternalLink, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Tool {
  id: number
  name: string
  description: string
  link: string
  category: string
  logo_url?: string
  featured: boolean
  popularity_score: number
  tags?: string[]
}

interface ToolCardProps {
  tool: Tool
  viewMode?: 'grid' | 'list'
}

export default function ToolCard({ tool, viewMode = 'grid' }: ToolCardProps) {
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group">
        {/* Logo */}
        <div className="flex-shrink-0">
          {tool.logo_url ? (
            <img 
              src={tool.logo_url} 
              alt={tool.name}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={cn(
            "w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold",
            tool.logo_url && "hidden"
          )}>
            {getInitials(tool.name)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{tool.name}</h3>
            {tool.featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{tool.description}</p>
        </div>

        {/* Category */}
        <Badge variant="secondary" className="hidden md:flex">
          {tool.category}
        </Badge>

        {/* Actions */}
        <Button asChild size="sm">
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Visit
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {tool.logo_url ? (
          <img 
            src={tool.logo_url} 
            alt={tool.name}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.remove('hidden')
            }}
          />
        ) : null}
        <div className={cn(
          "w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0",
          tool.logo_url && "hidden"
        )}>
          {getInitials(tool.name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{tool.name}</h3>
            {tool.featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
            )}
          </div>
          <Badge variant="outline" className="mt-1 text-xs">
            {tool.category}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">
        {tool.description}
      </p>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border mt-auto">
        <Button asChild className="flex-1">
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Visit Tool
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
