SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '0ac4903b-d496-4da7-99af-ac97468f76b0', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test01@test.com","user_id":"1724b377-d5bb-4f83-853c-43a158937969","user_phone":""}}', '2024-01-04 06:15:51.774379+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '1724b377-d5bb-4f83-853c-43a158937969', 'authenticated', 'authenticated', 'test01@test.com', '$2a$10$/uy2./uZkU4Jy.7FYuTeGeRFOQE.Fc615.rgsB6W5FxPsvZDCtaFu', '2024-01-04 06:15:51.776155+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-01-04 06:15:51.77008+00', '2024-01-04 06:15:51.776354+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('1724b377-d5bb-4f83-853c-43a158937969', '1724b377-d5bb-4f83-853c-43a158937969', '{"sub": "1724b377-d5bb-4f83-853c-43a158937969", "email": "test01@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-04 06:15:51.773165+00', '2024-01-04 06:15:51.773216+00', '2024-01-04 06:15:51.773216+00', 'dab91bd8-d53a-4fa1-b7a4-4dc952bd4daa');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: Chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Chats" ("id", "createdAt", "updatedAt", "title", "published", "Room_id", "User_id") VALUES
	('d02c4fc7-12f4-40b5-b014-66add5dd65dc', '2024-01-04 07:02:23.594432+00', '2024-01-04 07:02:23.594432+00', 'Test Chat 01', true, '30fc8cc2-366e-4f7c-a380-00a57fff60cd', '1724b377-d5bb-4f83-853c-43a158937969'),
	('6c450fe2-74e3-422d-be53-5c3b9fce2774', '2024-01-04 07:02:42.423456+00', '2024-01-04 07:02:42.423456+00', 'Test Chat 02', false, 'f36667f2-c4d0-4768-b647-930935039585', '1724b377-d5bb-4f83-853c-43a158937969'),
	('fbbc4c8d-05c6-45d1-a132-495d06b39fd3', '2024-01-04 07:03:04.718561+00', '2024-01-04 07:03:04.718561+00', 'Test Chat 03 Test Chat 03 Test Chat 03', true, '5a0e15a3-ed23-429f-af18-3140a4effe1c', '1724b377-d5bb-4f83-853c-43a158937969');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
