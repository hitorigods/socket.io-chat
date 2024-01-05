ALTER DATABASE postgres SET timezone TO 'Asia/Tokyo';

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_chat_updated_at BEFORE UPDATE ON "public"."Chats"
  FOR each ROW EXECUTE PROCEDURE moddatetime ("updatedAt");

CREATE TRIGGER handle_profile_updated_at BEFORE UPDATE ON "public"."Profiles"
  FOR each ROW EXECUTE PROCEDURE moddatetime ("updatedAt");

CREATE TRIGGER handle_room_updated_at BEFORE UPDATE ON "public"."Rooms"
  FOR each ROW EXECUTE PROCEDURE moddatetime ("updatedAt");
