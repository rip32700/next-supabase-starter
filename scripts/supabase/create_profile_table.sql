-- Create the profile table

create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  avatar_url text NULL
  primary key (id)
);

alter table public.profiles enable row level security;

-- Set up security policies

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( (select auth.uid()) = id );

create policy "Users can update own profile."
  on profiles for update
  using ( (select auth.uid()) = id );


-- if profile should only be visible to the user privately:

-- create policy "Profiles are viewable by users who created them."
--   on profiles for select
--   using ( (select auth.uid()) = id );

-- set up a trigger that creates a profile table on user creation

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, img_url)
  values (
        new.id,
        split_part(new.raw_user_meta_data ->> 'full_name', ' ', 1),
        split_part(new.raw_user_meta_data ->> 'full_name', ' ', 2),
        new.raw_user_meta_data ->> 'avatar_url'
        );
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
