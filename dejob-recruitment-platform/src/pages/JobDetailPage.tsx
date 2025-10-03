import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Star, Building, Users, ExternalLink, ArrowLeft, Briefcase } from 'lucide-react'
import { useJob } from '@/hooks/useJobs'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import LoadingSpinner from '@/components/LoadingSpinner'

function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { job, loading, error } = useJob(jobId!)
  const [applying, setApplying] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [coverLetter, setCoverLetter] = useState('')
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login', { state: { returnTo: `/jobs/${jobId}` } })
      return
    }

    if (!job) return

    setApplying(true)
    setApplicationStatus('idle')

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: job.id,
          user_id: user.id,
          cover_letter: coverLetter.trim() || null,
          status: 'pending'
        })

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setApplicationStatus('error')
          alert('You have already applied to this job.')
        } else {
          throw error
        }
      } else {
        setApplicationStatus('success')
        setShowApplicationForm(false)
        setCoverLetter('')
      }
    } catch (err: any) {
      console.error('Error applying to job:', err)
      setApplicationStatus('error')
      alert('Failed to submit application. Please try again.')
    } finally {
      setApplying(false)
    }
  }

  const formatSalary = (salaryRange: string | null) => {
    if (!salaryRange) return 'Salary not disclosed'
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

  const getJobTypeColor = (jobType: string) => {
    switch (jobType.toLowerCase()) {
      case 'full-time':
        return 'badge-blue'
      case 'part-time':
        return 'badge-green'
      case 'contract':
        return 'badge-purple'
      case 'remote':
        return 'badge-orange'
      default:
        return 'badge-blue'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist.'}</p>
        <Link to="/jobs" className="btn btn-primary">
          Browse All Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link to="/jobs" className="btn btn-secondary mr-4 flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Jobs</span>
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Job Info */}
            <div className="flex-1">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                    {job.featured && (
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Building className="h-5 w-5 mr-2" />
                    <span className="text-lg font-medium">{job.company.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatPostedDate(job.posted_date)}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{formatSalary(job.salary_range)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className={`badge ${getJobTypeColor(job.job_type)}`}>
                  {job.job_type}
                </span>
                <span className="badge badge-purple">
                  {job.experience_level}
                </span>
                <span className="badge badge-green">
                  {job.industry}
                </span>
                {job.remote_friendly && (
                  <span className="badge badge-orange">
                    Remote Friendly
                  </span>
                )}
                {job.featured && (
                  <span className="badge badge-blue">
                    Featured Job
                  </span>
                )}
              </div>
            </div>
            
            {/* Apply Button */}
            <div className="lg:w-80">
              {applicationStatus === 'success' ? (
                <div className="card p-6 text-center bg-green-50 border-green-200">
                  <div className="text-green-600 text-lg font-semibold mb-2">
                    Application Submitted!
                  </div>
                  <p className="text-green-700 text-sm">
                    Your application has been submitted successfully. The employer will review it and contact you if you're a good fit.
                  </p>
                </div>
              ) : (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this job</h3>
                  {!showApplicationForm ? (
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      className="btn btn-primary w-full py-3 text-lg font-semibold"
                      disabled={applying}
                    >
                      Apply Now
                    </button>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          placeholder="Tell the employer why you're interested in this position..."
                          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={applying}
                          className="btn btn-primary flex-1 py-2 font-semibold"
                        >
                          {applying ? 'Submitting...' : 'Submit Application'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          className="btn btn-secondary px-4"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
            </div>
            
            {/* Required Skills */}
            {job.skills_required && job.skills_required.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.map((skill) => (
                    <span key={skill} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company.name}</h3>
              
              <div className="space-y-3">
                {job.company.description && (
                  <p className="text-gray-700 text-sm">{job.company.description}</p>
                )}
                
                <div className="space-y-2 text-sm text-gray-600">
                  {job.company.industry && (
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>Industry: {job.company.industry}</span>
                    </div>
                  )}
                  {job.company.company_size && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Company size: {job.company.company_size} employees</span>
                    </div>
                  )}
                  {job.company.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>HQ: {job.company.location}</span>
                    </div>
                  )}
                  {job.company.founded_year && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Founded: {job.company.founded_year}</span>
                    </div>
                  )}
                </div>
                
                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-3"
                  >
                    Visit company website
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
            
            {/* Job Details */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="font-medium">{job.job_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience Level:</span>
                  <span className="font-medium">{job.experience_level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                {job.salary_range && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-medium">{job.salary_range}</span>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Apply by:</span>
                    <span className="font-medium">
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailPage