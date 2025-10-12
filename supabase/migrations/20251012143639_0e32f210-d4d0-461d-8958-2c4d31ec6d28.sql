-- Fix Critical Security Issues and Implement Role-Based Authorization

-- 1. Create public view for students (hide PII)
CREATE VIEW public.public_students AS
SELECT 
  id, 
  full_name, 
  student_id, 
  photo_url, 
  bio, 
  specialization, 
  skills, 
  batch, 
  status, 
  portfolio_url, 
  linkedin_url, 
  github_url, 
  joined_at,
  created_at
FROM public.students
WHERE status = 'active';

-- 2. Drop insecure policies and create secure ones for students table
DROP POLICY IF EXISTS "Anyone can view students" ON public.students;
DROP POLICY IF EXISTS "Admins can insert students" ON public.students;
DROP POLICY IF EXISTS "Admins can update students" ON public.students;
DROP POLICY IF EXISTS "Admins can delete students" ON public.students;

CREATE POLICY "Authenticated users can view active students"
ON public.students FOR SELECT
USING (
  (status = 'active' AND auth.uid() IS NOT NULL) OR 
  has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can insert students"
ON public.students FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update students"
ON public.students FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins and users can delete own students"
ON public.students FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- 3. Fix AI conversations - remove null user access
DROP POLICY IF EXISTS "Users can view own conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can insert own conversations" ON public.ai_conversations;

CREATE POLICY "Users can view own conversations"
ON public.ai_conversations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
ON public.ai_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
ON public.ai_conversations FOR DELETE
USING (auth.uid() = user_id);

-- Make user_id required for ai_conversations
ALTER TABLE public.ai_conversations 
ALTER COLUMN user_id SET NOT NULL;

-- 4. Add delete policy for profiles
CREATE POLICY "Users and admins can delete profiles"
ON public.profiles FOR DELETE
USING (
  (auth.uid() = id) OR 
  has_role(auth.uid(), 'admin')
);

-- 5. Secure payment transactions - remove public insert
DROP POLICY IF EXISTS "Anyone can create transactions" ON public.payment_transactions;

CREATE POLICY "Admins can manage transactions"
ON public.payment_transactions FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- 6. Create UPI payments table
CREATE TABLE IF NOT EXISTS public.upi_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id uuid REFERENCES public.donations(id) ON DELETE CASCADE,
  transaction_id text UNIQUE NOT NULL,
  upi_id text NOT NULL, -- Masked UPI ID
  payer_name text,
  payer_vpa text, -- Payer's VPA
  amount numeric NOT NULL CHECK (amount > 0),
  currency text DEFAULT 'INR',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  payment_app text CHECK (payment_app IN ('gpay', 'phonepe', 'paytm', 'other')),
  reference_id text,
  payment_timestamp timestamp with time zone,
  verified boolean DEFAULT false,
  verification_signature text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.upi_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage UPI payments"
ON public.upi_payments FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own UPI payments"
ON public.upi_payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.donations d
    WHERE d.id = upi_payments.donation_id
    AND d.donor_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  )
);

-- 7. Create galleries table for Pexels images
CREATE TABLE IF NOT EXISTS public.galleries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  image_url text NOT NULL,
  pexels_id text,
  photographer text,
  photographer_url text,
  is_featured boolean DEFAULT false,
  display_order integer,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view galleries"
ON public.galleries FOR SELECT
USING (true);

CREATE POLICY "Admins can manage galleries"
ON public.galleries FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- 8. Add trigger for updated_at on upi_payments
CREATE TRIGGER update_upi_payments_updated_at
BEFORE UPDATE ON public.upi_payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_upi_payments_donation_id ON public.upi_payments(donation_id);
CREATE INDEX IF NOT EXISTS idx_upi_payments_status ON public.upi_payments(status);
CREATE INDEX IF NOT EXISTS idx_upi_payments_transaction_id ON public.upi_payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);
CREATE INDEX IF NOT EXISTS idx_galleries_category ON public.galleries(category);
CREATE INDEX IF NOT EXISTS idx_galleries_featured ON public.galleries(is_featured);