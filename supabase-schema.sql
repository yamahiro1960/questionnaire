create table if not exists public.event_applications (
  id bigint generated always as identity primary key,
  submitted_at timestamptz not null default now(),
  organization text not null,
  name text not null,
  email text not null,
  phone text,
  attendees integer not null check (attendees > 0),
  message text
);

alter table public.event_applications enable row level security;

grant usage on schema public to anon;
grant insert on table public.event_applications to anon;
grant usage, select on sequence public.event_applications_id_seq to anon;

drop policy if exists event_applications_insert_anon on public.event_applications;
create policy event_applications_insert_anon
on public.event_applications
for insert
to anon
with check (true);
