import { useState, useEffect } from 'react'
import { supabase, Job, Company } from '@/lib/supabase'

export interface JobWithCompany extends Job {
  company: Company
}

export function useJobs() {
  const [jobs, setJobs] = useState<JobWithCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs(filters?: {
    search?: string
    location?: string
    industry?: string
    job_type?: string
    experience_level?: string
    featured_only?: boolean
  }) {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('posted_date', { ascending: false })

      // Apply filters
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }
      if (filters?.location && filters.location !== 'all') {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters?.industry && filters.industry !== 'all') {
        query = query.eq('industry', filters.industry)
      }
      if (filters?.job_type && filters.job_type !== 'all') {
        query = query.eq('job_type', filters.job_type)
      }
      if (filters?.experience_level && filters.experience_level !== 'all') {
        query = query.eq('experience_level', filters.experience_level)
      }
      if (filters?.featured_only) {
        query = query.eq('featured', true)
      }

      const { data: jobsData, error: jobsError } = await query

      if (jobsError) throw jobsError

      if (!jobsData || jobsData.length === 0) {
        setJobs([])
        return
      }

      // Fetch company data for all jobs
      const companyIds = [...new Set(jobsData.map(job => job.company_id))]
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .in('id', companyIds)

      if (companiesError) throw companiesError

      // Combine jobs with company data
      const jobsWithCompanies = jobsData.map(job => ({
        ...job,
        company: companiesData?.find(company => company.id === job.company_id) || null
      })).filter(job => job.company) // Only include jobs with valid companies

      setJobs(jobsWithCompanies)
    } catch (err: any) {
      console.error('Error fetching jobs:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { jobs, loading, error, fetchJobs }
}

export function useJob(jobId: string) {
  const [job, setJob] = useState<JobWithCompany | null>(null)
    const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId)
    }
  }, [jobId])

  async function fetchJob(id: string) {
    try {
      setLoading(true)
      setError(null)

      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .maybeSingle()

      if (jobError) throw jobError
      if (!jobData) {
        setError('Job not found')
        return
      }

      // Fetch company data
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', jobData.company_id)
        .maybeSingle()

      if (companyError) throw companyError
      if (!companyData) {
        setError('Company not found')
        return
      }

      setJob({ ...jobData, company: companyData })
    } catch (err: any) {
      console.error('Error fetching job:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { job, loading, error, refetch: () => fetchJob(jobId) }
}