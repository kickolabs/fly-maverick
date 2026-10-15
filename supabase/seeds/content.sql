-- Fly Maverick — sample destinations & tour packages
-- Content matches drizzle/migrations/0001_admin_content_management.sql seed rows.
-- Safe to re-run: uses ON CONFLICT (slug) DO NOTHING (no updates, no deletes).
-- Run AFTER supabase/migrations/20251015143000_fly_maverick_schema.sql
-- Prices are intentionally NULL (site shows "Request a Quote").

INSERT INTO public.destinations (slug, name, region, tagline, intro, experiences, published, display_order)
VALUES
  (
    'dubai',
    'Dubai',
    'Middle East',
    'Skylines, souks and desert sunsets',
    'A city of record-breaking architecture, world-class shopping and golden desert landscapes, all within easy reach of India.',
    ARRAY['Burj Khalifa observation decks','Desert safari at sunset','Dubai Marina dhow cruise','Old Dubai souks']::text[],
    true,
    0
  ),
  (
    'singapore',
    'Singapore',
    'Southeast Asia',
    'A garden city of modern wonders',
    'Clean, green and effortlessly modern, Singapore blends futuristic gardens, family attractions and an exceptional food scene.',
    ARRAY['Gardens by the Bay','Sentosa Island','Marina Bay at night','Hawker centre food trails']::text[],
    true,
    1
  ),
  (
    'thailand',
    'Thailand',
    'Southeast Asia',
    'Islands, temples and tropical warmth',
    'From buzzing Bangkok to the limestone islands of the Andaman Sea, Thailand offers beaches, culture and warm hospitality.',
    ARRAY['Phi Phi island hopping','Bangkok temples','Phuket beaches','Thai cooking classes']::text[],
    true,
    2
  ),
  (
    'malaysia',
    'Malaysia',
    'Southeast Asia',
    'Cityscapes meet rainforest and coast',
    'Malaysia pairs the energy of Kuala Lumpur with cool highlands, island escapes and rich multicultural heritage.',
    ARRAY['Petronas Twin Towers','Langkawi islands','Genting Highlands','Penang street food']::text[],
    true,
    3
  ),
  (
    'maldives',
    'Maldives',
    'Indian Ocean',
    'Overwater villas and turquoise lagoons',
    'A string of coral islands made for unhurried days, private villas and some of the clearest water on the planet.',
    ARRAY['Overwater villa stays','Snorkelling house reefs','Sunset cruises','Sandbank picnics']::text[],
    true,
    4
  ),
  (
    'switzerland',
    'Switzerland',
    'Europe',
    'Alpine peaks and storybook villages',
    'Snow-capped mountains, mirror-like lakes and scenic railways make Switzerland a timeless choice for every season.',
    ARRAY['Scenic panoramic trains','Jungfraujoch excursions','Lake Lucerne cruises','Zermatt and the Matterhorn']::text[],
    true,
    5
  ),
  (
    'france',
    'France',
    'Europe',
    'Romance, art and refined living',
    'Paris sets the stage for art, fashion and cuisine, while the French countryside and Riviera invite slower discovery.',
    ARRAY['Eiffel Tower evenings','Louvre and Musée d''Orsay','Seine river cruises','French Riviera drives']::text[],
    true,
    6
  ),
  (
    'italy',
    'Italy',
    'Europe',
    'History, coastlines and la dolce vita',
    'Ancient Rome, Renaissance Florence, romantic Venice and the dramatic Amalfi Coast — Italy rewards every kind of traveller.',
    ARRAY['Colosseum and Vatican','Venice gondola rides','Tuscan countryside','Amalfi Coast villages']::text[],
    true,
    7
  ),
  (
    'united-kingdom',
    'United Kingdom',
    'Europe',
    'Royal heritage and vibrant cities',
    'From London''s landmarks to the Scottish Highlands, the UK combines heritage, theatre and beautiful countryside.',
    ARRAY['London landmarks','West End theatre','Edinburgh old town','Scottish Highlands']::text[],
    true,
    8
  ),
  (
    'australia',
    'Australia',
    'Oceania',
    'Iconic harbours and wild coastlines',
    'Cosmopolitan cities, the Great Barrier Reef and unique wildlife make Australia a destination of big experiences.',
    ARRAY['Sydney Opera House','Great Barrier Reef','Great Ocean Road','Wildlife encounters']::text[],
    true,
    9
  ),
  (
    'new-zealand',
    'New Zealand',
    'Oceania',
    'Fjords, mountains and adventure',
    'Dramatic fjords, glaciers and rolling green landscapes make New Zealand a dream for scenery and adventure lovers.',
    ARRAY['Milford Sound cruises','Queenstown adventures','Hobbiton','Glacier and lake drives']::text[],
    true,
    10
  ),
  (
    'japan',
    'Japan',
    'East Asia',
    'Tradition and innovation in harmony',
    'Japan balances serene temples and gardens with neon-lit cities, bullet trains and a world-renowned food culture.',
    ARRAY['Mount Fuji views','Kyoto temples','Tokyo city life','Cherry blossom season']::text[],
    true,
    11
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.tour_packages (
  slug, name, destination_id, summary, description, duration, types, highlights, published, display_order
)
VALUES
  (
    'european-holidays',
    'European Holidays',
    (SELECT id FROM public.destinations WHERE slug = 'france'),
    'Multi-country journeys through Europe''s great cities and coastlines.',
    'Combine Paris, Switzerland, Italy and London into one seamless trip, planned around your pace, interests and budget.',
    '10+ nights suggested',
    ARRAY['City & Culture','Romantic']::text[],
    ARRAY['Multi-city routing','Rail and flight connections','Handpicked city hotels','Sightseeing suggestions']::text[],
    true,
    0
  ),
  (
    'switzerland-escapes',
    'Switzerland Escapes',
    (SELECT id FROM public.destinations WHERE slug = 'switzerland'),
    'Alpine scenery, lakeside towns and panoramic train journeys.',
    'Mountain excursions, lake cruises and scenic rail journeys, arranged around the season you choose to travel.',
    'Around a week suggested',
    ARRAY['Mountains & Nature','Romantic','Family']::text[],
    ARRAY['Scenic rail journeys','Mountain excursions','Lake stays','Seasonal planning']::text[],
    true,
    1
  ),
  (
    'dubai-holidays',
    'Dubai Holidays',
    (SELECT id FROM public.destinations WHERE slug = 'dubai'),
    'Iconic skylines, desert adventures and luxury stays.',
    'City sightseeing, desert experiences and theme parks — ideal for short breaks and family holidays.',
    'Short break · 3–5 nights suggested',
    ARRAY['City & Culture','Family']::text[],
    ARRAY['City sightseeing','Desert safari options','Theme park add-ons','Hotel choices for every style']::text[],
    true,
    2
  ),
  (
    'maldives-getaways',
    'Maldives Getaways',
    (SELECT id FROM public.destinations WHERE slug = 'maldives'),
    'Island resorts, overwater villas and slow, sunlit days.',
    'Resort and villa options matched to your travel style, from honeymoons to relaxed family escapes.',
    'Short break · 3–5 nights suggested',
    ARRAY['Beach & Islands','Romantic']::text[],
    ARRAY['Resort recommendations','Villa categories','Transfer coordination','Honeymoon planning']::text[],
    true,
    3
  ),
  (
    'singapore-holidays',
    'Singapore Holidays',
    (SELECT id FROM public.destinations WHERE slug = 'singapore'),
    'Modern attractions, gardens and family-friendly fun.',
    'Theme parks, gardens and Sentosa island days, easily combined with Malaysia or Thailand.',
    'Short break · 3–5 nights suggested',
    ARRAY['City & Culture','Family']::text[],
    ARRAY['Attraction planning','Sentosa experiences','Combine with Malaysia','Central hotel options']::text[],
    true,
    4
  ),
  (
    'thailand-adventures',
    'Thailand Adventures',
    (SELECT id FROM public.destinations WHERE slug = 'thailand'),
    'Bangkok, Phuket, Krabi and the islands of the Andaman.',
    'City energy, island hopping and beach time, combined into one trip to suit you.',
    'Around a week suggested',
    ARRAY['Beach & Islands','City & Culture']::text[],
    ARRAY['Island hopping','City and beach combos','Resort options','Local experiences']::text[],
    true,
    5
  ),
  (
    'japan-experiences',
    'Japan Experiences',
    (SELECT id FROM public.destinations WHERE slug = 'japan'),
    'Tokyo, Kyoto, Mount Fuji and timeless traditions.',
    'Modern cities and ancient temples, connected by Japan''s famous rail network.',
    '10+ nights suggested',
    ARRAY['City & Culture','Mountains & Nature']::text[],
    ARRAY['Rail-based routing','Cultural experiences','Seasonal timing advice','City and ryokan stays']::text[],
    true,
    6
  ),
  (
    'australia-holidays',
    'Australia Holidays',
    (SELECT id FROM public.destinations WHERE slug = 'australia'),
    'Harbour cities, reef adventures and coastal drives.',
    'Sydney, Melbourne, the Gold Coast and the Great Barrier Reef, arranged around your interests.',
    '10+ nights suggested',
    ARRAY['City & Culture','Beach & Islands','Family']::text[],
    ARRAY['Multi-city routing','Reef experiences','Wildlife encounters','Domestic connections']::text[],
    true,
    7
  ),
  (
    'new-zealand-adventures',
    'New Zealand Adventures',
    (SELECT id FROM public.destinations WHERE slug = 'new-zealand'),
    'Fjords, glaciers and dramatic landscapes.',
    'Scenic drives, adventure activities and breathtaking natural beauty across both islands.',
    '10+ nights suggested',
    ARRAY['Mountains & Nature','Romantic']::text[],
    ARRAY['Self-drive or guided options','Adventure activities','Scenic cruises','North and South Island']::text[],
    true,
    8
  ),
  (
    'family-international-vacations',
    'Family International Vacations',
    (SELECT id FROM public.destinations WHERE slug = 'dubai'),
    'Stress-free overseas holidays designed for all ages.',
    'Family-friendly destinations, hotels and activities, planned with children''s comfort and pace in mind.',
    'Around a week suggested',
    ARRAY['Family']::text[],
    ARRAY['Family-friendly hotels','Kid-approved attractions','Comfortable flight timings','Flexible pacing']::text[],
    true,
    9
  )
ON CONFLICT (slug) DO NOTHING;
