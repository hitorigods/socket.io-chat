ALTER DATABASE postgres SET timezone TO 'Asia/Tokyo';

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_chat_updated_at BEFORE UPDATE ON "public"."Chats"
  FOR each ROW EXECUTE PROCEDURE moddatetime ("updatedAt");
