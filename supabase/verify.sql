-- Run in Supabase SQL Editor after applying schema (+ optional seed).

-- 1) Expected public tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
-- Expect: destinations, enquiries, tour_packages, tourist_places, user_roles

-- 2) Column check for destinations (must match content.functions.ts)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'destinations'
ORDER BY ordinal_position;

-- 3) Column check for tour_packages
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'tour_packages'
ORDER BY ordinal_position;

-- 4) Published content counts (after seed)
SELECT
  (SELECT count(*) FROM public.destinations WHERE published) AS published_destinations,
  (SELECT count(*) FROM public.tour_packages WHERE published) AS published_packages,
  (SELECT count(*) FROM public.tourist_places WHERE published) AS published_places;

-- 5) RLS enabled?
SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('destinations', 'tour_packages', 'tourist_places', 'enquiries', 'user_roles')
ORDER BY 1;
