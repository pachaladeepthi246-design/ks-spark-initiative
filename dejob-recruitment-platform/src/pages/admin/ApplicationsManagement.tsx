import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Eye, Check, X, Clock, Filter, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ApplicationWithDetails {
  id: string
  job_id: string
  user_id: string
  cover_letter: string | null
  status: string
  applied_date: string
  resume_url: string | null
  job: {
    id: string
    title: string
    company_id: string
    location: string
    job_type: string
  }
  profile: {
    id: string
    full_name: string | null
    email: string | null
    phone: string | null
    experience_level: string | null
    skills: string[]
  }
  company: {
    id: string
    name: string
  }
}

function ApplicationsManagement() {
  const { isAdmin } = useAuth()
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (isAdmin) {
      fetchApplications()
    }
  }, [isAdmin])

  const fetchApplications = async () => {
    try {
      setLoading(true)

      // Fetch applications
      const { data: applicationsData } = await supabase
        .from('applications')
        .select('*')
        .order('applied_date', { ascending: false })

      if (!applicationsData) return

      // Fetch job details
      const jobIds = [...new Set(applicationsData.map(app => app.job_id))]
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('id, title, company_id, location, job_type')
        .in('id', jobIds)

      // Fetch user profiles
      const userIds = [...new Set(applicationsData.map(app => app.user_id))]
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, email, phone, experience_level, skills')
        .in('id', userIds)

      // Fetch companies
      const companyIds = [...new Set(jobsData?.map(job => job.company_id) || [])]
      const { data: companiesData } = await supabase
        .from('companies')
        .select('id, name')
        .in('id', companyIds)

      // Combine all data
      const applicationsWithDetails = applicationsData.map(app => ({
        ...app,
        job: jobsData?.find(job => job.id === app.job_id) || null,
        profile: profilesData?.find(profile => profile.id === app.user_id) || null,
        company: companiesData?.find(company => company.id === jobsData?.find(job => job.id === app.job_id)?.company_id) || null
      })).filter(app => app.job && app.profile && app.company)

      setApplications(applicationsWithDetails)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdating(applicationId)

      const { error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)

      if (error) throw error

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ))

      alert('Application status updated successfully')
    } catch (error: any) {
      console.error('Error updating application:', error)
      alert('Failed to update application status: ' + error.message)
    } finally {
      setUpdating(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'badge-orange'
      case 'reviewed': return 'badge-blue'
      case 'accepted': return 'badge-green'
      case 'rejected': return 'badge-red'
      default: return 'badge-blue'
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="btn btn-secondary flex items-center space-x-2 mb-4 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Application Management</h1>
          <p className="text-gray-600 mt-2">Review and manage job applications</p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by job title, applicant name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-full"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredApplications.length} of {applications.length} applications
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div key={application.id} className="card p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    {/* Job Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {application.company.name} • {application.job.location} • {application.job.job_type}
                      </p>
                    </div>

                    {/* Applicant Info */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-4 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {application.profile.full_name || 'No name provided'}
                        </h4>
                        <span className={`badge ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Email: {application.profile.email}</p>
                        {application.profile.phone && (
                          <p>Phone: {application.profile.phone}</p>
                        )}
                        {application.profile.experience_level && (
                          <p>Experience: {application.profile.experience_level}</p>
                        )}
                        <p>Applied: {new Date(application.applied_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    {application.profile.skills && application.profile.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {application.profile.skills.filter(skill => skill.trim()).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cover Letter */}
                    {application.cover_letter && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {application.cover_letter}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="lg:w-64 flex flex-col space-y-3">
                    <Link
                      to={`/jobs/${application.job_id}`}
                      className="btn btn-secondary flex items-center justify-center space-x-2 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Job</span>
                    </Link>
                    
                    {application.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                          disabled={updating === application.id}
                          className="btn btn-outline flex items-center justify-center space-x-2 text-sm"
                        >
                          <Clock className="h-4 w-4" />
                          <span>{updating === application.id ? 'Updating...' : 'Mark as Reviewed'}</span>
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'accepted')}
                          disabled={updating === application.id}
                          className="btn bg-green-600 text-white hover:bg-green-700 flex items-center justify-center space-x-2 text-sm"
                        >
                          <Check className="h-4 w-4" />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          disabled={updating === application.id}
                          className="btn bg-red-600 text-white hover:bg-red-700 flex items-center justify-center space-x-2 text-sm"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                    
                    {application.status !== 'pending' && (
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'pending')}
                        disabled={updating === application.id}
                        className="btn btn-outline flex items-center justify-center space-x-2 text-sm"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Reset to Pending</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">
                {applications.length === 0 ? 'No applications found' : 'No applications match your filters'}
              </p>
              {applications.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Applications will appear here when job seekers apply to your posted jobs.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationsManagement