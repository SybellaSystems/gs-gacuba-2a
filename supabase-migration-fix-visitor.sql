-- Migration: Fix school_inquiries visitor_name null constraint issues
-- 1) Ensure column exists
alter table school_inquiries add column if not exists visitor_name text;

-- 2) Backfill existing rows using `name`
update school_inquiries set visitor_name = name where visitor_name is null;

-- 3) Make sure column allows null (so legacy inserts won't fail). You can later set NOT NULL after backfilling if desired.
alter table school_inquiries alter column visitor_name drop not null;

-- 4) (Recommended) Set a default to empty string to avoid nulls from simple inserts
alter table school_inquiries alter column visitor_name set default '';

-- 5) Add trigger to automatically populate visitor_name from name when missing on insert/update
create or replace function ensure_visitor_name() returns trigger language plpgsql as $$
begin
  if new.visitor_name is null or new.visitor_name = '' then
    new.visitor_name := coalesce(new.name, '');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_ensure_visitor_name on school_inquiries;
create trigger trg_ensure_visitor_name
before insert or update on school_inquiries
for each row execute function ensure_visitor_name();

-- 6) Safety: backfill again (no-op if already set)
update school_inquiries set visitor_name = name where visitor_name is null or visitor_name = '';

-- Optional: if you prefer to enforce NOT NULL after backfill, run:
-- alter table school_inquiries alter column visitor_name set not null;
