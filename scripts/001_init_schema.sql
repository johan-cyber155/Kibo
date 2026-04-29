-- KIBO database schema
-- Tables: profiles, products, subscription_plans, subscriptions
-- All tables have RLS enabled

-- =========================================
-- PROFILES (extends auth.users)
-- =========================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  document_type text check (document_type in ('DNI', 'RUC', 'CE')),
  document_number text,
  phone text,
  address text,
  city text default 'Arequipa',
  stripe_customer_id text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- =========================================
-- PRODUCTS (hardware catalog)
-- =========================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('gpu', 'ar', 'print')),
  description text not null,
  price_pen integer not null, -- monthly subscription price in PEN (no IGV)
  specs text[] default '{}',
  badge text, -- 'Nuevo' | 'Popular' | 'Premium' | 'Recomendado' | 'Top Ventas' | null
  badge_variant text check (badge_variant in ('new', 'hot', 'premium')) default 'new',
  icon text, -- emoji icon
  color text, -- accent color for image card
  sort_order integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

alter table public.products enable row level security;

drop policy if exists "products_select_all" on public.products;
create policy "products_select_all" on public.products for select using (active = true);

-- =========================================
-- SUBSCRIPTION PLANS (Starter, Pro, Enterprise)
-- =========================================
create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subtitle text,
  price_pen integer not null,
  features text[] default '{}',
  icon text,
  featured boolean default false,
  sort_order integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

alter table public.subscription_plans enable row level security;

drop policy if exists "plans_select_all" on public.subscription_plans;
create policy "plans_select_all" on public.subscription_plans for select using (active = true);

-- =========================================
-- SUBSCRIPTIONS (user's active subscriptions)
-- =========================================
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Either a product subscription OR a plan subscription
  product_id uuid references public.products(id) on delete set null,
  plan_id uuid references public.subscription_plans(id) on delete set null,
  -- Display info captured at time of subscription
  item_name text not null,
  item_type text not null check (item_type in ('product', 'plan')),
  price_pen integer not null,
  -- Stripe data
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_session_id text,
  status text not null default 'incomplete' check (
    status in ('incomplete', 'active', 'past_due', 'canceled', 'unpaid', 'trialing', 'paused')
  ),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "subs_select_own" on public.subscriptions;
drop policy if exists "subs_insert_own" on public.subscriptions;
drop policy if exists "subs_update_own" on public.subscriptions;
drop policy if exists "subs_delete_own" on public.subscriptions;

create policy "subs_select_own" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subs_insert_own" on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "subs_update_own" on public.subscriptions for update using (auth.uid() = user_id);
create policy "subs_delete_own" on public.subscriptions for delete using (auth.uid() = user_id);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_stripe_sub_id_idx on public.subscriptions(stripe_subscription_id);
