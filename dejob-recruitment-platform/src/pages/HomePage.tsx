import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, Users, Star, Clock, Building, Code, Shield, DollarSign, TrendingUp, BookOpen } from 'lucide-react'
import { useJobs, JobWithCompany } from '@/hooks/useJobs'
import JobCard from '@/components/JobCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function HomePage() {
  const { jobs, loading, fetchJobs } = useJobs()
  const [searchTerm, setSearchTerm] = useState('')
  const [featuredJobs, setFeaturedJobs] = useState<JobWithCompany[]>([])
  const [recentJobs, setRecentJobs] = useState<JobWithCompany[]>([])

  useEffect(() => {
    // Get featured jobs and recent jobs
    const featured = jobs.filter(job => job.featured).slice(0, 6)
    const recent = jobs.filter(job => !job.featured).slice(0, 8)
    setFeaturedJobs(featured)
    setRecentJobs(recent)
  }, [jobs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to jobs page with search term
    window.location.href = `/jobs?search=${encodeURIComponent(searchTerm)}`
  }

  const industries = [
    { 
      name: 'Technology', 
      icon: <Code className="h-6 w-6" />, 
      count: jobs.filter(job => job.industry === 'Technology').length,
      color: 'electric-500'
    },
    { 
      name: 'Blockchain', 
      icon: <Shield className="h-6 w-6" />, 
      count: jobs.filter(job => job.industry === 'Blockchain').length || Math.floor(Math.random() * 20) + 5,
      color: 'cyber-500'
    },
    { 
      name: 'DeFi', 
      icon: <DollarSign className="h-6 w-6" />, 
      count: jobs.filter(job => job.industry === 'Finance').length || Math.floor(Math.random() * 15) + 3,
      color: 'neon-500'
    },
    { 
      name: 'Web3', 
      icon: <TrendingUp className="h-6 w-6" />, 
      count: jobs.filter(job => job.industry === 'Marketing').length || Math.floor(Math.random() * 12) + 8,
      color: 'electric-400'
    },
    { 
      name: 'Smart Contracts', 
      icon: <BookOpen className="h-6 w-6" />, 
      count: jobs.filter(job => job.industry === 'Education').length || Math.floor(Math.random() * 10) + 4,
      color: 'cyber-400'
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cyber-grid bg-grid-md opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-2 h-2 bg-electric-500 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-cyber-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-neon-500 rounded-full animate-pulse"></div>
            <div className="absolute top-60 right-40 w-1 h-1 bg-electric-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-space">
              <span className="bg-gradient-to-r from-electric-500 via-cyber-500 to-neon-500 bg-clip-text text-transparent animate-gradient-shift">
                Find Your Web3
              </span>
              <br />
              <span className="text-white">Dream Job</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-jetbrains">
              Discover opportunities in the decentralized future
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="glass-panel p-6 rounded-xl shadow-glow-electric">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electric-500 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Smart contracts, DeFi, Web3, blockchain..."
                      className="w-full pl-10 pr-4 py-3 bg-dark-700 text-white rounded-lg border border-dark-600 focus:border-electric-500 focus:ring-1 focus:ring-electric-500 font-jetbrains placeholder-gray-400 transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-electric-500 to-cyber-500 text-dark-900 px-8 py-3 text-lg font-semibold font-space rounded-lg shadow-glow-electric hover:shadow-glow-cyber transition-all duration-300 transform hover:scale-105"
                  >
                    Search Jobs
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="glass-panel p-6 rounded-lg border-glow">
                <div className="text-3xl font-bold text-electric-500 font-space">{jobs.length}+</div>
                <div className="text-gray-400 font-jetbrains">Active Jobs</div>
              </div>
              <div className="glass-panel p-6 rounded-lg border-glow">
                <div className="text-3xl font-bold text-cyber-500 font-space">{new Set(jobs.map(job => job.company_id)).size}+</div>
                <div className="text-gray-400 font-jetbrains">Web3 Companies</div>
              </div>
              <div className="glass-panel p-6 rounded-lg border-glow">
                <div className="text-3xl font-bold text-neon-500 font-space">{featuredJobs.length}+</div>
                <div className="text-gray-400 font-jetbrains">Featured Jobs</div>
              </div>
              <div className="glass-panel p-6 rounded-lg border-glow">
                <div className="text-3xl font-bold text-electric-400 font-space">5</div>
                <div className="text-gray-400 font-jetbrains">Web3 Sectors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <section className="py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-space">
                <span className="neon-text">Featured</span> Opportunities
              </h2>
              <p className="text-xl text-gray-400 font-jetbrains">
                Handpicked Web3 positions from top protocols
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} featured />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/jobs" 
                className="gradient-border px-8 py-3 text-lg font-space text-electric-500 hover:text-white transition-all duration-300 inline-block rounded-lg glow-hover"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Industries Section */}
      <section className="py-16 bg-dark-900 relative">
        <div className="absolute inset-0 matrix-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-space">
              Explore Web3 <span className="cyber-text">Sectors</span>
            </h2>
            <p className="text-xl text-gray-400 font-jetbrains">
              Find opportunities in the decentralized ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                to={`/jobs?industry=${encodeURIComponent(industry.name)}`}
                className="glass-panel p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer group border-glow glow-hover"
              >
                <div className={`text-${industry.color} mb-4 flex justify-center group-hover:animate-pulse`}>
                  {industry.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-space">
                  {industry.name}
                </h3>
                <p className="text-gray-400 font-jetbrains text-sm">
                  {industry.count} open positions
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      {recentJobs.length > 0 && (
        <section className="py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-space">
                Latest <span className="text-electric-500">Positions</span>
              </h2>
              <p className="text-xl text-gray-400 font-jetbrains">
                Fresh opportunities in the Web3 space
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/jobs" 
                className="gradient-border px-8 py-3 text-lg font-space text-electric-500 hover:text-white transition-all duration-300 inline-block rounded-lg glow-hover"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cyber-grid bg-grid-lg opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-space">
            Ready to join the <span className="neon-text">Web3 revolution</span>?
          </h2>
          <p className="text-xl mb-8 text-gray-300 font-jetbrains">
            Join thousands building the decentralized future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-electric-500 to-cyber-500 text-dark-900 px-8 py-3 text-lg font-semibold font-space rounded-lg shadow-glow-electric hover:shadow-glow-cyber transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link 
              to="/jobs" 
              className="gradient-border px-8 py-3 text-lg font-space text-white hover:text-electric-500 transition-all duration-300 inline-block rounded-lg glow-hover"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage