alter table "public"."Chats" add
    constraint Chats_Rooms_id_fkey foreign key ("Rooms_id") references "public"."Rooms" (id) on update cascade on delete cascade

-- alter table "public"."Chats" add constraint "Chats_Room_id_fkey" FOREIGN KEY ("Room_id") REFERENCES "public"."Rooms" (id) ON UPDATE CASCADE ON DELETE CASCADE on delete cascade,
-- alter table "public"."Chats" validate constraint "Chats_Room_id_fkey";
