# HUDC Podcast Page

A community-driven web platform for **Haramaya University Developer Community (HUDC)** podcast. It lets the community suggest podcast guests, showcase their projects, and gives admins full control over submissions through a protected dashboard.

---

## Features

### Public Landing Page
- Animated hero with live community stats (total guest suggestions & project submissions)
- **Guest Suggestion Form** — community members can nominate podcast guests with contact info, availability, and topic ideas
- **Project Showcase Form** — developers can submit their builds with tech stack, links, screenshots, and descriptions
- **Project Gallery** — paginated, infinitely scrollable gallery of admin-approved community projects with a detail modal
- Forms are dynamically controlled (shown/hidden, fields required/optional) via admin config — no redeploy needed

### Admin Dashboard (`/admin`)
- Protected via Supabase Auth (JWT-based session management with Zustand)
- **Stats Overview** — live metrics on total submissions and pending reviews
- **Guest Manager** — searchable table of all guest suggestions with status management and detail modal
- **Project Manager** — review, approve/reject, and delete submitted projects
- **Config Panel (Master Toggle Board)** — toggle public forms on/off and set individual fields as required or optional in real-time

### Telegram Notifications
- Supabase Edge Function (`notify-telegram`) fires on new `INSERT` events to the `projects` and `guests` tables
- Sends formatted Telegram messages to a configured chat, including project screenshots as a media album when available

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 |
| Backend / DB | Supabase (Postgres, Auth, Storage, Edge Functions) |
| Animations | Framer Motion + react-intersection-observer |
| Icons | Lucide React |
| Notifications | Telegram Bot API (via Supabase Edge Function) |

---

## Project Structure

```
src/
├── api/              # Supabase query/mutation functions
├── components/       # Shared UI (layout, auth guard, animations, toasts)
├── features/
│   ├── admin/        # Dashboard, stats, config panel
│   ├── guests/       # Guest manager (table, modal, hooks)
│   ├── projects/     # Project manager (table, modal, hooks)
│   └── public/       # Hero, GuestForm, ProjectForm, Gallery
├── hooks/            # Global hooks (auth store, scroll reveal)
├── lib/              # Supabase client
├── pages/            # Route-level page components
└── store/            # Zustand stores

supabase/
└── functions/
    └── notify-telegram/   # Deno edge function for Telegram alerts
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project with the following tables: `projects`, `guests`, `system_config`
- A Supabase storage bucket named `project_screenshots`

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Database Setup

Run the following SQL in your Supabase **SQL Editor** to create the required tables, views, and security policies.

### Create Tables

```sql
CREATE TABLE public.guests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name TEXT NOT NULL,
  role TEXT,
  telegram TEXT,
  phone TEXT,
  linkedin TEXT,
  portfolio TEXT,
  rationale TEXT NOT NULL,
  status TEXT DEFAULT 'pending'::text,
  is_verified BOOLEAN DEFAULT false,
  is_anonymous BOOLEAN DEFAULT false,
  discord_handle TEXT,
  twitter_x TEXT,
  availability TEXT,
  preferred_topics TEXT,
  CONSTRAINT guests_pkey PRIMARY KEY (id)
);

CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  github_link TEXT,
  demo_link TEXT,
  is_approved BOOLEAN DEFAULT false,
  author TEXT,
  discord_handle TEXT,
  twitter_link TEXT,
  project_type TEXT,
  video_demo_url TEXT,
  screenshots TEXT[] DEFAULT '{}'::text[],
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

CREATE TABLE public.system_config (
  id TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  label TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  value TEXT,
  category TEXT,
  CONSTRAINT system_config_pkey PRIMARY KEY (id)
);
```

### Community Stats View

```sql
CREATE OR REPLACE VIEW public.community_stats AS
SELECT
  (SELECT count(*) FROM public.guests) as total_guests,
  (SELECT count(*) FROM public.projects) as total_projects;

GRANT SELECT ON public.community_stats TO anon, authenticated;
```

### Row Level Security (RLS)

RLS is required for the app to work correctly. It ensures anonymous users can only submit and view approved content, while authenticated admins have full access.

```sql
-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Projects
CREATE POLICY "Public_View_Approved" ON public.projects FOR SELECT TO anon USING (is_approved = true);
CREATE POLICY "Public_Submit" ON public.projects FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin_Full_Access" ON public.projects FOR ALL TO authenticated USING (true);

-- Guests
CREATE POLICY "Public_Submit_Guest" ON public.guests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin_Full_Access_Guests" ON public.guests FOR ALL TO authenticated USING (true);

-- System Config
CREATE POLICY "Public_Read_Config" ON public.system_config FOR SELECT USING (true);
CREATE POLICY "Admin_Manage_Config" ON public.system_config FOR UPDATE TO authenticated USING (true);
```

### Seed `system_config`

The forms and config panel are entirely driven by rows in `system_config`. Without this data the forms will render nothing. Run this insert after creating the table:

```sql
INSERT INTO public.system_config (id, label, is_enabled, value, category) VALUES
-- Form-level toggles (controls whether the entire form is shown)
('guest_form',                  'Guest Suggestion Form',   true, 'optional', 'status'),
('project_form',                'Project Showcase Form',   true, 'optional', 'status'),

-- Guest form fields
('field_guest_name',            'Guest Full Name',         true, 'required', 'guest_form'),
('field_guest_role',            'Professional Role',       true, 'required', 'guest_form'),
('field_guest_rationale',       'Rationale / Why Guest',   true, 'required', 'guest_form'),
('field_guest_telegram',        'Telegram Handle',         true, 'optional', 'guest_form'),
('field_guest_phone',           'Phone Number',            true, 'optional', 'guest_form'),
('field_guest_linkedin',        'LinkedIn Profile',        true, 'optional', 'guest_form'),
('field_guest_twitter',         'Twitter / X Handle',      true, 'optional', 'guest_form'),
('field_guest_discord',         'Discord Handle',          true, 'optional', 'guest_form'),
('field_guest_portfolio',       'Portfolio Website',       true, 'optional', 'guest_form'),
('field_guest_availability',    'Meeting Availability',    true, 'optional', 'guest_form'),
('field_guest_topics',          'Suggested Topics',        true, 'optional', 'guest_form'),

-- Project form fields
('field_project_title',         'Project Title',           true, 'required', 'projects_form'),
('field_project_author',        'Author Name',             true, 'required', 'projects_form'),
('field_project_description',   'Description',             true, 'required', 'projects_form'),
('field_project_github',        'Source Code URL',         true, 'optional', 'projects_form'),
('field_project_demo',          'Live Demo URL',           true, 'optional', 'projects_form'),
('field_project_tech_stack',    'Tech Stack',              true, 'optional', 'projects_form'),
('field_project_type',          'Project Category',        true, 'optional', 'projects_form'),
('field_project_screenshots',   'Screenshots',             true, 'optional', 'projects_form'),
('field_project_video',         'Walkthrough Video',       true, 'optional', 'projects_form'),
('field_project_twitter',       'X / Twitter Link',        true, 'optional', 'projects_form'),
('field_project_discord',       'Discord Handle',          true, 'optional', 'projects_form');
```

You can adjust `is_enabled` and `value` (`required` / `optional`) per field at any time from the admin Config Panel.

### Storage Bucket

In your Supabase project go to **Storage** and create a new bucket named `project_screenshots`. Set it to **public** so uploaded screenshot URLs are accessible in the gallery. Without a public bucket, project screenshots will fail to load.

---

## Supabase Edge Function

### Deploy

```bash
supabase functions deploy notify-telegram
```

### Set Secrets

The function needs two secrets. Set them via the Supabase CLI:

```bash
supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
supabase secrets set TELEGRAM_CHAT_ID=your_chat_id
```

Or go to your Supabase project → **Edge Functions** → `notify-telegram` → **Secrets** and add them there.

### Wire Up the Triggers

Instead of webhooks, this project uses PostgreSQL triggers with `pg_net` to call the edge function directly from the database. Run this in your Supabase **SQL Editor**:

```sql
-- 1. Enable the pg_net extension (required to make HTTP calls from SQL)
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- 2. Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_telegram_notification()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/notify-telegram',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || '<YOUR_ANON_KEY>'
    ),
    body := jsonb_build_object(
      'record', row_to_json(NEW),
      'table', TG_TABLE_NAME,
      'type', TG_OP
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach triggers to both tables
CREATE TRIGGER on_guest_submitted
  AFTER INSERT ON public.guests
  FOR EACH ROW EXECUTE FUNCTION public.handle_telegram_notification();

CREATE TRIGGER on_project_submitted
  AFTER INSERT ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_telegram_notification();
```

Replace `<YOUR_PROJECT_REF>` with your Supabase project reference and `<YOUR_ANON_KEY>` with your project's anon key.

---

## Admin Access

The `/admin` route is protected — unauthenticated users are redirected to `/login` automatically.

To set up your admin account, go to your Supabase project → **Authentication → Users → Add user → Create new user** and enter an email and password. This creates a confirmed user in Supabase Auth which generates a JWT on login, granting the `authenticated` role that the RLS policies use to allow full admin access to the database.

Once created, use those credentials to sign in at `/login`.
