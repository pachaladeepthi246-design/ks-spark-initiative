import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Company } from '@/lib/supabase'
import { ArrowLeft, Save, X } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

interface JobFormData {
  title: string
  description: string
  company_id: string
  location: string
  salary_range: string
  job_type: string
  industry: string
  experience_level: string
  skills_required: string[]
  deadline: string
  featured: boolean
  remote_friendly: boolean
}

function JobForm() {
  const { jobId } = useParams<{ jobId?: string }>()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    company_id: '',
    location: '',
    salary_range: '',
    job_type: 'Full-time',
    industry: 'Technology',
    experience_level: 'Mid-level',
    skills_required: [''],
    deadline: '',
    featured: false,
    remote_friendly: false
  })

  const isEditing = Boolean(jobId)

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin')
      return
    }
    
    fetchInitialData()
  }, [isAdmin, jobId, navigate])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      
      // Fetch companies
      const { data: companiesData } = await supabase
        .from('companies')
        .select('*')
        .order('name')
      
      if (companiesData) {
        setCompanies(companiesData)
        
        // If not editing and we have companies, set first company as default
        if (!isEditing && companiesData.length > 0) {
          setFormData(prev => ({ ...prev, company_id: companiesData[0].id }))
        }
      }
      
      // If editing, fetch job data
      if (isEditing && jobId) {
        const { data: jobData, error: jobError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .maybeSingle()
        
        if (jobError) throw jobError
        
        if (jobData) {
          setFormData({
            title: jobData.title,
            description: jobData.description,
            company_id: jobData.company_id,
            location: jobData.location,
            salary_range: jobData.salary_range || '',
            job_type: jobData.job_type,
            industry: jobData.industry,
            experience_level: jobData.experience_level,
            skills_required: jobData.skills_required || [''],
            deadline: jobData.deadline ? jobData.deadline.split('T')[0] : '',
            featured: jobData.featured,
            remote_friendly: jobData.remote_friendly
          })
        }
      }
    } catch (err: any) {
      console.error('Error fetching data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        company_id: formData.company_id,
        location: formData.location,
        salary_range: formData.salary_range || null,
        job_type: formData.job_type,
        industry: formData.industry,
        experience_level: formData.experience_level,
        skills_required: formData.skills_required.filter(skill => skill.trim()),
        deadline: formData.deadline || null,
        featured: formData.featured,
        remote_friendly: formData.remote_friendly,
        status: 'active'
      }

      if (isEditing) {
        const { error } = await supabase
          .from('jobs')
          .update({ ...jobData, updated_at: new Date().toISOString() })
          .eq('id', jobId)
        
        if (error) throw error
        alert('Job updated successfully!')
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert(jobData)
        
        if (error) throw error
        alert('Job posted successfully!')
      }
      
      navigate('/admin')
    } catch (err: any) {
      console.error('Error saving job:', err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSkillChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills_required: prev.skills_required.map((skill, i) => i === index ? value : skill)
    }))
  }

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills_required: [...prev.skills_required, '']
    }))
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills_required: prev.skills_required.filter((_, i) => i !== index)
    }))
  }

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="btn btn-secondary flex items-center space-x-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Job' : 'Post New Job'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditing ? 'Update job details below' : 'Fill in the job details below'}
          </p>
        </div>

        {/* Form */}
        <div className="card p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input w-full"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <select
                  required
                  value={formData.company_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_id: e.target.value }))}
                  className="input w-full"
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="input w-full"
                  placeholder="e.g., San Francisco, CA or Remote"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  value={formData.job_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, job_type: e.target.value }))}
                  className="input w-full"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="input w-full"
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  value={formData.experience_level}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_level: e.target.value }))}
                  className="input w-full"
                >
                  <option value="Entry-level">Entry-level</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={formData.salary_range}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary_range: e.target.value }))}
                  className="input w-full"
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="input w-full"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input w-full h-40 resize-none"
                placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity special..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <div className="space-y-2">
                {formData.skills_required.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="input flex-1"
                      placeholder="Enter a required skill"
                    />
                    {formData.skills_required.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn btn-secondary text-sm"
                >
                  Add Skill
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Featured Job</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.remote_friendly}
                  onChange={(e) => setFormData(prev => ({ ...prev, remote_friendly: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Remote Friendly</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : (isEditing ? 'Update Job' : 'Post Job')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobForm