create extension if not exists "moddatetime" with schema "extensions";

create table "public"."Rooms" (
    "id" uuid not null default gen_random_uuid(),
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now(),
    "name" text not null,
    "Chat_count" numeric not null default '0'::numeric,
    "User_id" uuid not null
);

CREATE UNIQUE INDEX "Rooms_pkey" ON public."Rooms" USING btree (id);
alter table "public"."Rooms" add constraint "Rooms_pkey" PRIMARY KEY using index "Rooms_pkey";

grant delete on table "public"."Rooms" to "anon";
grant insert on table "public"."Rooms" to "anon";
grant references on table "public"."Rooms" to "anon";
grant select on table "public"."Rooms" to "anon";
grant trigger on table "public"."Rooms" to "anon";
grant truncate on table "public"."Rooms" to "anon";
grant update on table "public"."Rooms" to "anon";

grant delete on table "public"."Rooms" to "authenticated";
grant insert on table "public"."Rooms" to "authenticated";
grant references on table "public"."Rooms" to "authenticated";
grant select on table "public"."Rooms" to "authenticated";
grant trigger on table "public"."Rooms" to "authenticated";
grant truncate on table "public"."Rooms" to "authenticated";
grant update on table "public"."Rooms" to "authenticated";

grant delete on table "public"."Rooms" to "service_role";
grant insert on table "public"."Rooms" to "service_role";
grant references on table "public"."Rooms" to "service_role";
grant select on table "public"."Rooms" to "service_role";
grant trigger on table "public"."Rooms" to "service_role";
grant truncate on table "public"."Rooms" to "service_role";
grant update on table "public"."Rooms" to "service_role";
