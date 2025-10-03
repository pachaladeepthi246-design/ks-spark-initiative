import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, MapPin, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { useJobs } from '@/hooks/useJobs'
import JobCard from '@/components/JobCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { jobs, loading, error, fetchJobs } = useJobs()
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [location, setLocation] = useState(searchParams.get('location') || 'all')
  const [industry, setIndustry] = useState(searchParams.get('industry') || 'all')
  const [jobType, setJobType] = useState(searchParams.get('job_type') || 'all')
  const [experienceLevel, setExperienceLevel] = useState(searchParams.get('experience_level') || 'all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const industries = ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Education']
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote']
  const experienceLevels = ['Entry-level', 'Mid-level', 'Senior']
  const locations = ['New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Boston, MA', 'Austin, TX', 'Los Angeles, CA', 'Seattle, WA', 'Remote']

  useEffect(() => {
    // Apply filters when component mounts or search params change
    const filters = {
      search: searchParams.get('search') || undefined,
      location: searchParams.get('location') !== 'all' ? searchParams.get('location') || undefined : undefined,
      industry: searchParams.get('industry') !== 'all' ? searchParams.get('industry') || undefined : undefined,
      job_type: searchParams.get('job_type') !== 'all' ? searchParams.get('job_type') || undefined : undefined,
      experience_level: searchParams.get('experience_level') !== 'all' ? searchParams.get('experience_level') || undefined : undefined,
    }
    
    fetchJobs(filters)
  }, [searchParams, fetchJobs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams({ search: searchTerm || undefined })
  }

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams)
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all') {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    
    setSearchParams(newParams)
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setLocation('all')
    setIndustry('all')
    setJobType('all')
    setExperienceLevel('all')
    setSearchParams({})
  }

  const hasActiveFilters = searchTerm || location !== 'all' || industry !== 'all' || jobType !== 'all' || experienceLevel !== 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Job</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary px-8 py-3 font-semibold"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Toggle for Mobile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden btn btn-secondary flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">
                {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
              </span>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h2>
              
              <div className="space-y-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value)
                      updateSearchParams({ location: e.target.value })
                    }}
                    className="w-full input"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => {
                      setIndustry(e.target.value)
                      updateSearchParams({ industry: e.target.value })
                    }}
                    className="w-full input"
                  >
                    <option value="all">All Industries</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => {
                      setJobType(e.target.value)
                      updateSearchParams({ job_type: e.target.value })
                    }}
                    className="w-full input"
                  >
                    <option value="all">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Experience Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => {
                      setExperienceLevel(e.target.value)
                      updateSearchParams({ experience_level: e.target.value })
                    }}
                    className="w-full input"
                  >
                    <option value="all">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Results */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No jobs found matching your criteria</p>
                <button
                  onClick={clearAllFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'space-y-6'
              }>
                {jobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    featured={job.featured}
                    compact={viewMode === 'list'}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default JobsPage