import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { JobWithCompany } from '@/hooks/useJobs'
import { Plus, Users, Briefcase, FileText, TrendingUp, Edit, Trash2, Star, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'

interface AdminStats {
  totalJobs: number
  activeJobs: number
  totalApplications: number
  pendingApplications: number
}

function AdminDashboard() {
  const { user, isAdmin } = useAuth()
  const [stats, setStats] = useState<AdminStats>({ totalJobs: 0, activeJobs: 0, totalApplications: 0, pendingApplications: 0 })
  const [recentJobs, setRecentJobs] = useState<JobWithCompany[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData()
    }
  }, [isAdmin])

  const fetchAdminData = async () => {
    try {
      setLoading(true)

      // Fetch jobs stats
      const { data: jobs } = await supabase
        .from('jobs')
        .select('status')
      
      // Fetch applications stats
      const { data: applications } = await supabase
        .from('applications')
        .select('status')

      // Fetch recent jobs with company info
      const { data: recentJobsData } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (recentJobsData) {
        // Fetch company data for recent jobs
        const companyIds = [...new Set(recentJobsData.map(job => job.company_id))]
        const { data: companiesData } = await supabase
          .from('companies')
          .select('*')
          .in('id', companyIds)

        const jobsWithCompanies = recentJobsData.map(job => ({
          ...job,
          company: companiesData?.find(company => company.id === job.company_id) || null
        })).filter(job => job.company)

        setRecentJobs(jobsWithCompanies)
      }

      // Calculate stats
      const totalJobs = jobs?.length || 0
      const activeJobs = jobs?.filter(job => job.status === 'active').length || 0
      const totalApplications = applications?.length || 0
      const pendingApplications = applications?.filter(app => app.status === 'pending').length || 0

      setStats({ totalJobs, activeJobs, totalApplications, pendingApplications })
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)

      if (error) throw error

      // Refresh data
      fetchAdminData()
      alert('Job deleted successfully')
    } catch (error: any) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job: ' + error.message)
    }
  }

  const toggleJobFeatured = async (jobId: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ featured: !currentFeatured })
        .eq('id', jobId)

      if (error) throw error

      // Refresh data
      fetchAdminData()
    } catch (error: any) {
      console.error('Error updating job:', error)
      alert('Failed to update job: ' + error.message)
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access the admin panel.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage jobs, applications, and platform content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/jobs/new" className="btn btn-primary flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post New Job</span>
            </Link>
            <Link to="/admin/applications" className="btn btn-outline flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Review Applications</span>
            </Link>
            <Link to="/admin/jobs" className="btn btn-outline flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Manage All Jobs</span>
            </Link>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Jobs</h2>
            <Link to="/admin/jobs" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View all jobs
            </Link>
          </div>

          {recentJobs.length > 0 ? (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        {job.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        <span className={`badge ${job.status === 'active' ? 'badge-green' : 'badge-orange'}`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{job.company.name} • {job.location}</p>
                      <p className="text-gray-500 text-sm mt-2">Posted {new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn btn-secondary text-xs flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                      </Link>
                      <Link
                        to={`/admin/jobs/${job.id}/edit`}
                        className="btn btn-outline text-xs flex items-center space-x-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => toggleJobFeatured(job.id, job.featured)}
                        className={`btn text-xs ${job.featured ? 'btn-primary' : 'btn-outline'}`}
                      >
                        <Star className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="btn bg-red-600 text-white hover:bg-red-700 text-xs flex items-center space-x-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No jobs found</p>
              <Link to="/admin/jobs/new" className="btn btn-primary mt-4">
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard