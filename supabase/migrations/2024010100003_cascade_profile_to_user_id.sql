alter table "public"."Profiles" add
    constraint Profiles_User_id_fkey foreign key ("User_id") references auth.users (id) on update cascade on delete cascade
