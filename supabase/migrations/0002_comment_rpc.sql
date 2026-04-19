create or replace function public.create_comment(
  p_theme_id uuid,
  p_content_block_id uuid,
  p_target_type text,
  p_author_name text,
  p_body text
)
returns public.comments
language plpgsql
security definer
set search_path = public
as $$
declare
  cleaned_author text := btrim(p_author_name);
  cleaned_body text := btrim(p_body);
  inserted_comment public.comments;
begin
  if p_target_type not in ('theme', 'block') then
    raise exception 'Invalid comment target.' using errcode = '22023';
  end if;

  if char_length(cleaned_author) < 2 or char_length(cleaned_author) > 80 then
    raise exception 'Author name must be between 2 and 80 characters.' using errcode = '22023';
  end if;

  if char_length(cleaned_body) < 2 or char_length(cleaned_body) > 2000 then
    raise exception 'Comment body must be between 2 and 2000 characters.' using errcode = '22023';
  end if;

  if not exists (select 1 from public.themes where id = p_theme_id) then
    raise exception 'Theme not found.' using errcode = '22023';
  end if;

  if p_target_type = 'theme' and p_content_block_id is not null then
    raise exception 'Theme comments cannot include a block id.' using errcode = '22023';
  end if;

  if p_target_type = 'block' then
    if p_content_block_id is null then
      raise exception 'Block comments require a block id.' using errcode = '22023';
    end if;

    if not exists (
      select 1
      from public.content_blocks
      where id = p_content_block_id
        and theme_id = p_theme_id
    ) then
      raise exception 'Block not found in theme.' using errcode = '22023';
    end if;
  end if;

  insert into public.comments (
    theme_id,
    content_block_id,
    target_type,
    author_name,
    body
  ) values (
    p_theme_id,
    p_content_block_id,
    p_target_type,
    cleaned_author,
    cleaned_body
  )
  returning * into inserted_comment;

  return inserted_comment;
end;
$$;

revoke all on function public.create_comment(uuid, uuid, text, text, text) from public;
grant execute on function public.create_comment(uuid, uuid, text, text, text) to anon, authenticated;
