import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Star, Building, Users, Zap, Shield } from 'lucide-react'
import { JobWithCompany } from '@/hooks/useJobs'

interface JobCardProps {
  job: JobWithCompany
  featured?: boolean
  compact?: boolean
}

function JobCard({ job, featured = false, compact = false }: JobCardProps) {
  const formatSalary = (salaryRange: string | null) => {
    if (!salaryRange) return 'Competitive package'
    return salaryRange
  }

  const formatPostedDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays <= 7) return `${diffDays} days ago`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const getJobTypeStyle = (jobType: string) => {
    switch (jobType.toLowerCase()) {
      case 'full-time':
        return 'bg-electric-500/20 text-electric-500 border-electric-500/30'
      case 'part-time':
        return 'bg-cyber-500/20 text-cyber-500 border-cyber-500/30'
      case 'contract':
        return 'bg-neon-500/20 text-neon-500 border-neon-500/30'
      case 'remote':
        return 'bg-electric-400/20 text-electric-400 border-electric-400/30'
      default:
        return 'bg-electric-500/20 text-electric-500 border-electric-500/30'
    }
  }

  if (compact) {
    return (
      <Link to={`/jobs/${job.id}`} className="glass-panel p-4 block hover:scale-105 transition-all duration-300 glow-hover border-glow group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-electric-500 transition-colors font-space">
              {job.title}
            </h3>
            <div className="flex items-center text-gray-400 mb-2">
              <Building className="h-4 w-4 mr-1" />
              <span className="text-sm font-jetbrains">{job.company.name}</span>
            </div>
          </div>
          {featured && (
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-electric-500 animate-pulse" />
              <Star className="h-4 w-4 text-electric-500 fill-current" />
            </div>
          )}
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3 font-jetbrains">
          <MapPin className="h-4 w-4 mr-1 text-cyber-500" />
          <span>{job.location}</span>
          <span className="mx-2 text-dark-500">•</span>
          <Clock className="h-4 w-4 mr-1 text-neon-500" />
          <span>{formatPostedDate(job.posted_date)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded text-xs font-medium font-space border ${getJobTypeStyle(job.job_type)}`}>
            {job.job_type}
          </span>
          {job.remote_friendly && (
            <span className="px-2 py-1 rounded text-xs font-medium font-space border bg-cyber-500/20 text-cyber-500 border-cyber-500/30">
              Remote
            </span>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/jobs/${job.id}`} className="glass-panel p-6 block hover:scale-105 transition-all duration-300 relative group glow-hover border-glow">
      {featured && (
        <div className="absolute top-4 right-4 flex items-center space-x-1">
          <Zap className="h-5 w-5 text-electric-500 animate-pulse" />
          <Star className="h-5 w-5 text-electric-500 fill-current" />
        </div>
      )}
      
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-dark-700 to-dark-600 rounded-lg flex items-center justify-center border border-dark-500 group-hover:border-electric-500/50 transition-colors">
            <Shield className="h-6 w-6 text-electric-500" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-electric-500 transition-colors font-space">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-400 mb-2">
            <Building className="h-4 w-4 mr-1" />
            <span className="font-jetbrains">{job.company.name}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4 line-clamp-2 font-jetbrains">
        {job.description.substring(0, 150)}...
      </p>
      
      <div className="flex items-center text-gray-500 text-sm mb-4 font-jetbrains">
        <MapPin className="h-4 w-4 mr-1 text-cyber-500" />
        <span>{job.location}</span>
        <span className="mx-2 text-dark-500">•</span>
        <Clock className="h-4 w-4 mr-1 text-neon-500" />
        <span>{formatPostedDate(job.posted_date)}</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 rounded text-xs font-medium font-space border ${getJobTypeStyle(job.job_type)}`}>
          {job.job_type}
        </span>
        <div className="flex items-center text-gray-400">
          <DollarSign className="h-4 w-4 mr-1 text-electric-500" />
          <span className="text-sm font-medium font-jetbrains">{formatSalary(job.salary_range)}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {job.skills_required && job.skills_required.slice(0, 3).map((skill, index) => {
          const colors = ['text-electric-500 bg-electric-500/10 border-electric-500/30', 'text-cyber-500 bg-cyber-500/10 border-cyber-500/30', 'text-neon-500 bg-neon-500/10 border-neon-500/30']
          return (
            <span key={skill} className={`px-2 py-1 text-xs rounded border font-jetbrains ${colors[index % colors.length]}`}>
              {skill}
            </span>
          )
        })}
        {job.skills_required && job.skills_required.length > 3 && (
          <span className="px-2 py-1 bg-dark-600 text-gray-400 text-xs rounded border border-dark-500 font-jetbrains">
            +{job.skills_required.length - 3} more
          </span>
        )}
      </div>
      
      {(job.remote_friendly || job.featured) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-600">
          {job.remote_friendly && (
            <span className="px-2 py-1 rounded text-xs font-medium font-space border bg-cyber-500/20 text-cyber-500 border-cyber-500/30">
              Remote Friendly
            </span>
          )}
          {job.featured && (
            <span className="px-2 py-1 rounded text-xs font-medium font-space border bg-electric-500/20 text-electric-500 border-electric-500/30 animate-pulse">
              Featured Job
            </span>
          )}
        </div>
      )}
    </Link>
  )
}

export default JobCard