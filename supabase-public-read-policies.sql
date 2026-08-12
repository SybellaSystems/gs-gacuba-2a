-- Supabase public read policies for news and gallery
-- Run this in the Supabase SQL editor to allow anonymous SELECTs on these tables.

-- If Row Level Security is enabled, create a policy allowing selects.
create policy if not exists "Allow public read on news_items" on public.news_items
  for select using (true);

create policy if not exists "Allow public read on gallery_items" on public.gallery_items
  for select using (true);

-- For safety, do not alter write permissions here. This only allows read for anon role when RLS is enabled.

-- If you prefer to disable RLS entirely for these tables, run:
-- alter table public.news_items disable row level security;
-- alter table public.gallery_items disable row level security;
