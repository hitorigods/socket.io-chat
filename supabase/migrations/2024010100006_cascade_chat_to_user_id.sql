alter table "public"."Chats" add
    constraint Chats_User_id_fkey foreign key ("User_id") references auth.users (id) on update cascade on delete cascade
