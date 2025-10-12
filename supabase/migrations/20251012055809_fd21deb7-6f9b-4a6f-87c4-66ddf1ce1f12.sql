-- Add AI conversation tracking table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  model text DEFAULT 'google/gemini-2.5-flash',
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
ON public.ai_conversations FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own conversations"
ON public.ai_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Add payment transactions table
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id uuid REFERENCES public.donations(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('UPI', 'GPay', 'PhonePe', 'CashFree')),
  transaction_id text UNIQUE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  payment_gateway_response jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create transactions"
ON public.payment_transactions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view transactions"
ON public.payment_transactions FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Add voice recordings table for AI voice features
CREATE TABLE IF NOT EXISTS public.voice_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  audio_url text NOT NULL,
  transcription text,
  duration_seconds integer,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.voice_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own recordings"
ON public.voice_recordings FOR ALL
USING (auth.uid() = user_id);

-- Update innovations table to support AI-generated content
ALTER TABLE public.innovations 
ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS generation_prompt text;