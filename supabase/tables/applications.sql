CREATE TABLE applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL,
    user_id UUID NOT NULL,
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    applied_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);