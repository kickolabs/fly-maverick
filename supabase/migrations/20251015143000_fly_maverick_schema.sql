-- Fly Maverick — idempotent public schema bootstrap
-- Source of truth for columns/types/RLS: drizzle/migrations/0000_migration.sql
-- and drizzle/migrations/0001_admin_content_management.sql
--
-- Safe for an empty public schema. Re-runnable: does not DROP tables or delete data.
-- Apply manually in Supabase SQL Editor (do not auto-run against production from CI).
-- After schema succeeds, run supabase/seeds/content.sql separately if you need sample rows.

-- ---------------------------------------------------------------------------
-- Roles / admin helper (required by RLS policies)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- ---------------------------------------------------------------------------
-- Enquiries (forms)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
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

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'enquiries'
      AND column_name = 'status'
  ) THEN
    ALTER TABLE public.enquiries
      ADD COLUMN status text NOT NULL DEFAULT 'new'
      CHECK (status IN ('new','contacted','completed'));
  END IF;
END $$;

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins read enquiries" ON public.enquiries;
CREATE POLICY "Admins read enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update enquiries" ON public.enquiries;
CREATE POLICY "Admins update enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);

-- ---------------------------------------------------------------------------
-- Destinations
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text NOT NULL,
  region text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  intro text NOT NULL DEFAULT '',
  experiences text[] NOT NULL DEFAULT '{}',
  image_url text,
  published boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.destinations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public reads published destinations" ON public.destinations;
CREATE POLICY "Public reads published destinations"
  ON public.destinations
  FOR SELECT
  TO anon, authenticated
  USING (published OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins insert destinations" ON public.destinations;
CREATE POLICY "Admins insert destinations"
  ON public.destinations
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update destinations" ON public.destinations;
CREATE POLICY "Admins update destinations"
  ON public.destinations
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete destinations" ON public.destinations;
CREATE POLICY "Admins delete destinations"
  ON public.destinations
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS destinations_published_order_idx
  ON public.destinations (published, display_order, name);

-- ---------------------------------------------------------------------------
-- Tourist places (destination detail pages)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tourist_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  published boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tourist_places TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tourist_places TO authenticated;
GRANT ALL ON public.tourist_places TO service_role;
ALTER TABLE public.tourist_places ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public reads published places" ON public.tourist_places;
CREATE POLICY "Public reads published places"
  ON public.tourist_places
  FOR SELECT
  TO anon, authenticated
  USING (published OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins insert places" ON public.tourist_places;
CREATE POLICY "Admins insert places"
  ON public.tourist_places
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update places" ON public.tourist_places;
CREATE POLICY "Admins update places"
  ON public.tourist_places
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete places" ON public.tourist_places;
CREATE POLICY "Admins delete places"
  ON public.tourist_places
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS tourist_places_destination_id_idx
  ON public.tourist_places (destination_id, published, display_order);

-- ---------------------------------------------------------------------------
-- Tour packages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tour_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text NOT NULL,
  destination_id uuid REFERENCES public.destinations(id) ON DELETE SET NULL,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  types text[] NOT NULL DEFAULT '{}',
  highlights text[] NOT NULL DEFAULT '{}',
  image_url text,
  price numeric(12,2) CHECK (price IS NULL OR price >= 0),
  currency text,
  published boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tour_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_packages TO authenticated;
GRANT ALL ON public.tour_packages TO service_role;
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public reads published packages" ON public.tour_packages;
CREATE POLICY "Public reads published packages"
  ON public.tour_packages
  FOR SELECT
  TO anon, authenticated
  USING (published OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins insert packages" ON public.tour_packages;
CREATE POLICY "Admins insert packages"
  ON public.tour_packages
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update packages" ON public.tour_packages;
CREATE POLICY "Admins update packages"
  ON public.tour_packages
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete packages" ON public.tour_packages;
CREATE POLICY "Admins delete packages"
  ON public.tour_packages
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS tour_packages_destination_id_idx
  ON public.tour_packages (destination_id, published, display_order);

CREATE INDEX IF NOT EXISTS tour_packages_published_order_idx
  ON public.tour_packages (published, display_order, name);

-- ---------------------------------------------------------------------------
-- Storage bucket + policies for optional cover images
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('travel-images', 'travel-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public reads travel images" ON storage.objects;
CREATE POLICY "Public reads travel images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'travel-images');

DROP POLICY IF EXISTS "Admins upload travel images" ON storage.objects;
CREATE POLICY "Admins upload travel images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'travel-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update travel images" ON storage.objects;
CREATE POLICY "Admins update travel images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'travel-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete travel images" ON storage.objects;
CREATE POLICY "Admins delete travel images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'travel-images' AND public.has_role(auth.uid(), 'admin'));

-- Notify PostgREST to reload schema cache (no-op if unavailable)
NOTIFY pgrst, 'reload schema';
