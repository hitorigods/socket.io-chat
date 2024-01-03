alter database postgres set timezone to 'Asia/Tokyo';

create extension if not exists moddatetime schema extensions;

create trigger handle_user_updated_at before update on user
  for each row execute procedure moddatetime ("updatedAt");

create trigger handle_chat_updated_at before update on chat
  for each row execute procedure moddatetime ("updatedAt");
