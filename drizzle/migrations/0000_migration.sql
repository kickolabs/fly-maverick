CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_type text NOT NULL CHECK (enquiry_type IN ('flight','package','destination','business','contact')),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) <= 255),
  mobile text NOT NULL CHECK (char_length(mobile) <= 20),
  company_name text CHECK (char_length(company_name) <= 160),
  service text CHECK (char_length(service) <= 120),
  destination text CHECK (char_length(destination) <= 160),
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  message text CHECK (char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);