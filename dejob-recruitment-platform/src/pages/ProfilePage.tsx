import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Profile } from '@/lib/supabase'
import { User, Mail, Phone, MapPin, Briefcase, Edit, Save, X, FileText, Clock, Building, Eye } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ApplicationWithJob {
  id: string
  job_id: string
  status: string
  applied_date: string
  cover_letter: string | null
  job: {
    id: string
    title: string
    company_id: string
    location: string
    job_type: string
    status: string
  }
  company: {
    id: string
    name: string
  }
}

function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [applications, setApplications] = useState<ApplicationWithJob[]>([])
  const [activeTab, setActiveTab] = useState<'profile' | 'applications'>('profile')
  const [loading, setLoading] = useState(true)
  const [applicationsLoading, setApplicationsLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    location: '',
    experience_level: '',
    bio: '',
    skills: [] as string[]
  })

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    } else if (user) {
      fetchProfile()
      fetchApplications()
    }
  }, [user, authLoading, navigate])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setProfile(data)
        setEditForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          location: data.location || '',
          experience_level: data.experience_level || '',
          bio: data.bio || '',
          skills: data.skills || []
        })
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          id: user!.id,
          email: user!.email,
          full_name: user!.user_metadata?.full_name || '',
          phone: null,
          location: null,
          experience_level: null,
          skills: [],
          resume_url: null,
          bio: null
        }
        
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single()

        if (createError) throw createError
        setProfile(createdProfile)
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true)
      
      // Fetch user's applications
      const { data: applicationsData } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user!.id)
        .order('applied_date', { ascending: false })

      if (!applicationsData || applicationsData.length === 0) {
        setApplications([])
        return
      }

      // Fetch job details
      const jobIds = [...new Set(applicationsData.map(app => app.job_id))]
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('id, title, company_id, location, job_type, status')
        .in('id', jobIds)

      // Fetch company details
      const companyIds = [...new Set(jobsData?.map(job => job.company_id) || [])]
      const { data: companiesData } = await supabase
        .from('companies')
        .select('id, name')
        .in('id', companyIds)

      // Combine data
      const applicationsWithJobs = applicationsData.map(app => ({
        ...app,
        job: jobsData?.find(job => job.id === app.job_id) || null,
        company: companiesData?.find(company => company.id === jobsData?.find(job => job.id === app.job_id)?.company_id) || null
      })).filter(app => app.job && app.company)

      setApplications(applicationsWithJobs)
    } catch (err: any) {
      console.error('Error fetching applications:', err)
    } finally {
      setApplicationsLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone || null,
          location: editForm.location || null,
          experience_level: editForm.experience_level || null,
          bio: editForm.bio || null,
          skills: editForm.skills,
          updated_at: new Date().toISOString()
        })
        .eq('id', user!.id)

      if (error) throw error

      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          ...editForm,
          phone: editForm.phone || null,
          location: editForm.location || null,
          experience_level: editForm.experience_level || null,
          bio: editForm.bio || null
        })
      }

      setEditing(false)
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        location: profile.location || '',
        experience_level: profile.experience_level || '',
        bio: profile.bio || '',
        skills: profile.skills || []
      })
    }
    setEditing(false)
    setError('')
  }

  const handleSkillAdd = () => {
    setEditForm(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }))
  }

  const handleSkillChange = (index: number, value: string) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }))
  }

  const handleSkillRemove = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
        <p className="text-gray-600">Unable to load your profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header with Tabs */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              {activeTab === 'profile' && !editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : activeTab === 'profile' && editing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : null}
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Applications ({applications.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
                {error}
              </div>
            )}

            {activeTab === 'profile' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                        className="input w-full"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{profile.full_name || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{profile.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="input w-full"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        className="input w-full"
                        placeholder="e.g., New York, NY"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{profile.location || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    {editing ? (
                      <select
                        value={editForm.experience_level}
                        onChange={(e) => setEditForm(prev => ({ ...prev, experience_level: e.target.value }))}
                        className="input w-full"
                      >
                        <option value="">Select experience level</option>
                        <option value="Entry-level">Entry-level</option>
                        <option value="Mid-level">Mid-level</option>
                        <option value="Senior">Senior</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <span>{profile.experience_level || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    {editing ? (
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        className="input w-full h-24 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profile.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    {editing ? (
                      <div className="space-y-2">
                        {editForm.skills.map((skill, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => handleSkillChange(index, e.target.value)}
                              className="input flex-1"
                              placeholder="Enter a skill"
                            />
                            <button
                              type="button"
                              onClick={() => handleSkillRemove(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleSkillAdd}
                          className="btn btn-secondary text-sm"
                        >
                          Add Skill
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills && profile.skills.length > 0 ? (
                          profile.skills.filter(skill => skill.trim()).map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-600">No skills added</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Applications Tab */
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">My Applications</h2>
                
                {applicationsLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {application.job.title}
                              </h3>
                              <span className={`badge ${getStatusColor(application.status)}`}>
                                {application.status}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-2">
                              <Building className="h-4 w-4 mr-1" />
                              <span>{application.company.name}</span>
                              <span className="mx-2">•</span>
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{application.job.location}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-500 text-sm mb-3">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Applied {new Date(application.applied_date).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <span>{application.job.job_type}</span>
                            </div>
                            
                            {application.cover_letter && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded line-clamp-3">
                                  {application.cover_letter}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className="ml-4">
                            <Link
                              to={`/jobs/${application.job_id}`}
                              className="btn btn-secondary flex items-center space-x-2 text-sm"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View Job</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-4">No applications yet</p>
                    <p className="text-gray-500 text-sm mb-6">
                      Start applying to jobs to track your applications here
                    </p>
                    <Link to="/jobs" className="btn btn-primary">
                      Browse Jobs
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage