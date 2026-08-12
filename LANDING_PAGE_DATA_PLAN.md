# Landing Page ↔ Admin Portal Data Connection Plan

## 1. Current state

- The landing page is currently static and driven by `src/data/schools.ts`.
- The `Contact` page simulates submission locally and does not write to the database.
- `NewsAnnouncements`, `Gallery`, `Hero`, `Stats`, `Welcome`, `Academics`, `SportsAcademy`, `CampusExperience`, and `Footer` all read from the local config object.
- The Admin Portal has a Supabase-backed workspace with these tables:
  - `school_contacts`
  - `notification_campaigns`
  - `school_content`
  - `school_inquiries`

## 2. Landing page data that should be controlled by the admin portal

### Read-only data for the public site
- Site branding and school profile
  - `name`, `slogan`, `logoUrl`, `primaryColor`, `secondaryColor`, `accentColor`
  - contact info: email, phone, address, social links
- Hero slides and landing call-to-action copy
- Welcome message and headmaster/leadership greeting
- Stats cards and high-level metrics
- Academic program list and curriculum descriptions
- Sports academy description and feature list
- Campus experience content and gallery image summaries
- News & announcements
- Gallery items

### Writable data from landing page
- Online admissions / enrollment submission data
  - candidate name, email, phone, academic stream, message
- Visitor inquiry form data
  - topic, message, status, timestamp

## 3. Existing DB tables that map to landing page sections

| Landing page feature | Current Admin table | Notes |
|---|---|---|
| News & announcements | `school_content` | Good fit if content includes `content_type='News'` and `status='Published'` |
| Gallery | `school_content` | Can use `content_type='Gallery'` or a dedicated `gallery_items` table |
| Admissions form | `school_inquiries` | Best target for form submissions from the landing page |
| Public contact info | none yet | Should live in a `site_settings` or `school_profile` table |
| Hero / welcome / stats / programs | none yet | Need new tables or structured JSON content |

## 4. Recommended schema additions

### Core content tables
- `site_settings`
  - `id`, `school_name`, `logo_url`, `primary_color`, `secondary_color`, `accent_color`, `contact_email`, `contact_phone`, `address`, `facebook`, `twitter`, `instagram`, `youtube`, `updated_at`
- `hero_slides`
  - `id`, `title`, `description`, `image_url`, `tag`, `status`, `order`, `updated_at`
- `welcome_section`
  - `id`, `title`, `message`, `author_name`, `author_role`, `author_image`, `status`, `updated_at`
- `metrics`
  - `id`, `label`, `value`, `icon_key`, `order`, `status`
- `academic_programs`
  - `id`, `title`, `code`, `description`, `icon_key`, `status`, `order`
- `gallery_items`
  - `id`, `src`, `title`, `category`, `description`, `status`, `order`
- `news_items`
  - `id`, `title`, `date`, `category`, `summary`, `content`, `author`, `read_time`, `image_url`, `status`, `published_at`

### Existing tables to reuse
- `school_inquiries`
  - use for enrollment/contact form submissions from the public site
- `school_content`
  - can be preserved for generic announcements and perhaps hero content if expanded

## 5. Integration strategy

### Phase 1 — Normalize data model
1. Add `site_settings` or `school_profile` to hold core identity and contact details.
2. Add dedicated tables for hero slides, news, gallery, programs, and metrics.
3. Keep `school_inquiries` as the landing page submission sink.
4. Use the admin portal to manage these tables through a single workspace.

### Phase 2 — Wire landing page reads to Supabase
1. Add a Supabase client to the landing page: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. Replace `SCHOOLS_DATA` with live fetches from Supabase.
3. Query published content only:
   - `site_settings`
   - `hero_slides` where `status='Published'`
   - `welcome_section`
   - `metrics`
   - `academic_programs`
   - `sports_academy` or `school_content`/custom table
   - `gallery_items`
   - `news_items`
4. Keep the landing page SSR/CSR query simple and cache-friendly.

### Phase 3 — Wire landing page writes to Supabase
1. Change `Contact.tsx` to submit to `school_inquiries` via Supabase.
2. Store the submitted form as a DB row with `status='New'`.
3. Optionally show a confirmation message and allow admin portal to update inquiry status.
4. Do not use `mailto:` fallback as the primary submission path; use it only as secondary convenience.

### Phase 4 — Align admin portal control flows
1. Admin portal should be the single source of truth for all public website content.
2. Manage publish state in tables using `status` flags.
3. Admin portal should re-fetch live content after writes so the public site reflects changes quickly.
4. Optionally add a content preview or publish workflow if needed.

## 6. Security and access control

### Supabase policy recommendations
- Allow anonymous `SELECT` only on published public data.
- Allow anonymous `INSERT` only on `school_inquiries` (with `WITH CHECK` to validate required fields).
- Use authenticated or service-role access for admin portal writes on all content tables.
- Protect `school_contacts` and `notification_campaigns` so only admin sessions can read/write.

### Environment variable conventions
- Use the same Supabase project for both apps.
- For the landing page frontend:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- For server/seed scripts:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_KEY`
- Avoid mixing `NEXT_PUBLIC_` and `VITE_` prefixes unless the landing page explicitly uses that build system.

## 7. Recommended implementation path

1. **Create shared schema** in Supabase for site settings, hero slides, news, gallery, programs, and inquiries.
2. **Update the admin portal** to edit these tables.
3. **Update the landing page** to fetch live published content and submit forms.
4. **Test end to end**: admin creates content → landing page reads it; visitor submits form → admin portal receives it.
5. **Add monitoring** for submission errors and a stale-content fallback.

## 8. Seamless connection checklist

- [ ] One Supabase project for both public and admin apps
- [ ] Shared content schema with clear `status`/`published_at`
- [ ] Admin writes → landing page reads
- [ ] Landing page form submits → admin receives inquiry rows
- [ ] Anonymous public read policy for published content only
- [ ] Service-role or authenticated admin writes only
- [ ] Consistent env var naming across both repos

## 9. Quick win recommendation

Start by converting these three pieces first:
- `news` → `news_items`
- `gallery` → `gallery_items`
- `contact` form → `school_inquiries`

Then expand into hero slides, welcome content, and program data.
