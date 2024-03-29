create extension if not exists "moddatetime" with schema "extensions";

create table "public"."Profiles" (
    "id" uuid not null default gen_random_uuid(),
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now(),
    "nickname" text not null,
    "avatarUrl" text,
    "User_id" uuid not null
);

CREATE UNIQUE INDEX "Profiles_pkey" ON public."Profiles" USING btree (id);
alter table "public"."Profiles" add constraint "Profiles_pkey" PRIMARY KEY using index "Profiles_pkey";

grant delete on table "public"."Profiles" to "anon";
grant insert on table "public"."Profiles" to "anon";
grant references on table "public"."Profiles" to "anon";
grant select on table "public"."Profiles" to "anon";
grant trigger on table "public"."Profiles" to "anon";
grant truncate on table "public"."Profiles" to "anon";
grant update on table "public"."Profiles" to "anon";

grant delete on table "public"."Profiles" to "authenticated";
grant insert on table "public"."Profiles" to "authenticated";
grant references on table "public"."Profiles" to "authenticated";
grant select on table "public"."Profiles" to "authenticated";
grant trigger on table "public"."Profiles" to "authenticated";
grant truncate on table "public"."Profiles" to "authenticated";
grant update on table "public"."Profiles" to "authenticated";

grant delete on table "public"."Profiles" to "service_role";
grant insert on table "public"."Profiles" to "service_role";
grant references on table "public"."Profiles" to "service_role";
grant select on table "public"."Profiles" to "service_role";
grant trigger on table "public"."Profiles" to "service_role";
grant truncate on table "public"."Profiles" to "service_role";
grant update on table "public"."Profiles" to "service_role";
