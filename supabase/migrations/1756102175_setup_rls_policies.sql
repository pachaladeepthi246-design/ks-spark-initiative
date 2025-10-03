-- Migration: setup_rls_policies
-- Created at: 1756102175

-- Enable Row Level Security on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Companies policies (public read access)
CREATE POLICY "Companies are viewable by everyone" ON companies FOR SELECT USING (true);
CREATE POLICY "Companies can be inserted by authenticated users" ON companies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Companies can be updated by authenticated users" ON companies FOR UPDATE USING (auth.role() = 'authenticated');

-- Jobs policies (public read access)
CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Jobs can be inserted by authenticated users" ON jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Jobs can be updated by authenticated users" ON jobs FOR UPDATE USING (auth.role() = 'authenticated');

-- Profiles policies (users can only see and modify their own profile)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Applications policies (users can only see their own applications)
CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON applications FOR UPDATE USING (auth.uid() = user_id);

-- Admin can view all applications (for recruiters)
CREATE POLICY "Service role can view all applications" ON applications FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role can update applications" ON applications FOR UPDATE USING (auth.role() = 'service_role');;