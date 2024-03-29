create extension if not exists "moddatetime" with schema "extensions";

create table "public"."Chats" (
    "id" uuid not null default gen_random_uuid(),
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now(),
    "title" text not null,
    "published" boolean not null default false,
    "User_id" uuid not null,
    "Profile_id" uuid not null,
    "Room_id" uuid not null
);

CREATE UNIQUE INDEX "Chats_pkey" ON public."Chats" USING btree (id);
alter table "public"."Chats" add constraint "Chats_pkey" PRIMARY KEY using index "Chats_pkey";

grant delete on table "public"."Chats" to "anon";
grant insert on table "public"."Chats" to "anon";
grant references on table "public"."Chats" to "anon";
grant select on table "public"."Chats" to "anon";
grant trigger on table "public"."Chats" to "anon";
grant truncate on table "public"."Chats" to "anon";
grant update on table "public"."Chats" to "anon";

grant delete on table "public"."Chats" to "authenticated";
grant insert on table "public"."Chats" to "authenticated";
grant references on table "public"."Chats" to "authenticated";
grant select on table "public"."Chats" to "authenticated";
grant trigger on table "public"."Chats" to "authenticated";
grant truncate on table "public"."Chats" to "authenticated";
grant update on table "public"."Chats" to "authenticated";

grant delete on table "public"."Chats" to "service_role";
grant insert on table "public"."Chats" to "service_role";
grant references on table "public"."Chats" to "service_role";
grant select on table "public"."Chats" to "service_role";
grant trigger on table "public"."Chats" to "service_role";
grant truncate on table "public"."Chats" to "service_role";
grant update on table "public"."Chats" to "service_role";
