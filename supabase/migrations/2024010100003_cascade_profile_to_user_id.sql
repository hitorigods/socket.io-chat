alter table "public"."Profiles" add
    constraint Profiles_User_id_fkey foreign key ("User_id") references auth.users (id) on update cascade on delete cascade

-- alter table "public"."Profiles" add constraint "Profiles_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
-- alter table "public"."Profiles" validate constraint "Profiles_User_id_fkey";
