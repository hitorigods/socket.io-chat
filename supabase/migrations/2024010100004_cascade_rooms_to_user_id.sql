alter table "public"."Rooms" add
    constraint Rooms_User_id_fkey foreign key ("User_id") references auth.users (id) on update cascade on delete cascade
