CREATE TABLE jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company_id UUID NOT NULL,
    location VARCHAR(255),
    salary_range VARCHAR(100),
    job_type VARCHAR(50),
    industry VARCHAR(100),
    experience_level VARCHAR(50),
    skills_required TEXT[],
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deadline DATE,
    status VARCHAR(50) DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    remote_friendly BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);