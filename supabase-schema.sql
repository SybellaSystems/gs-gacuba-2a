-- Supabase schema for the landing page public content that is actually DB-backed.
-- Only news, gallery, and inquiry submission are connected to Supabase.

create extension if not exists "uuid-ossp";

-- Gallery items for the public gallery section.
create table if not exists gallery_items (
  id uuid default uuid_generate_v4() primary key,
  src text not null,
  title text,
  category text,
  description text,
  status text default 'Published',
  "order" int default 0,
  updated_at timestamp with time zone default now()
);

alter table gallery_items add column if not exists src text not null;
alter table gallery_items add column if not exists title text;
alter table gallery_items add column if not exists category text;
alter table gallery_items add column if not exists description text;
alter table gallery_items add column if not exists status text default 'Published';
alter table gallery_items add column if not exists "order" int default 0;
alter table gallery_items add column if not exists updated_at timestamp with time zone default now();

-- News items / announcements.
create table if not exists news_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date text,
  category text,
  summary text,
  content text[] default array[]::text[],
  author text,
  read_time text,
  image_url text,
  status text default 'Published',
  published_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table news_items add column if not exists title text;
alter table news_items add column if not exists date text;
alter table news_items add column if not exists category text;
alter table news_items add column if not exists summary text;
alter table news_items add column if not exists content text[] default array[]::text[];
alter table news_items add column if not exists author text;
alter table news_items add column if not exists read_time text;
alter table news_items add column if not exists image_url text;
alter table news_items add column if not exists status text default 'Published';
alter table news_items add column if not exists published_at timestamp with time zone default now();
alter table news_items add column if not exists updated_at timestamp with time zone default now();

-- Inquiry submissions from the landing page.
create table if not exists school_inquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  academic_stream text,
  message text,
  status text default 'New',
  created_at timestamp with time zone default now()
);

alter table school_inquiries add column if not exists name text not null;
alter table school_inquiries add column if not exists email text not null;
alter table school_inquiries add column if not exists phone text;
alter table school_inquiries add column if not exists academic_stream text;
alter table school_inquiries add column if not exists message text;
alter table school_inquiries add column if not exists status text default 'New';
alter table school_inquiries add column if not exists created_at timestamp with time zone default now();
-- Legacy compatibility: some deployments used `visitor_name` as the name column.
alter table school_inquiries add column if not exists visitor_name text;
