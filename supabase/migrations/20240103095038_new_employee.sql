ALTER DATABASE postgres SET timezone TO 'Asia/Tokyo';

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_user_updated_at BEFORE UPDATE ON "public"."User"
  FOR each ROW EXECUTE PROCEDURE moddatetime ("updatedAt");

CREATE TRIGGER handle_chat_updated_at BEFORE UPDATE ON "public"."Chat"
  FOR each ROW EXECUTE PROCEDURE moddatetime ("updatedAt");
