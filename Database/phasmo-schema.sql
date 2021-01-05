--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

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
-- Name: objective_state; Type: TYPE; Schema: public; Owner: phasmouser
--

CREATE TYPE public.objective_state AS ENUM (
    'yes',
    'no',
    'started',
    'irrelevant'
);


ALTER TYPE public.objective_state OWNER TO phasmouser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: phasmouser
--

CREATE TABLE public.games (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    ghost_name character varying(255) NOT NULL,
    alone_ghost boolean,
    emf5 boolean,
    fingerprints boolean,
    freezing boolean,
    ghost_writing boolean,
    spirit_box boolean,
    orbs boolean,
    obj_main public.objective_state DEFAULT 'irrelevant'::public.objective_state,
    obj_ghostevent public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_ghostphoto public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_dirtywater public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_emf public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_coldroom public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_motionsensor public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_smudgesticks public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_crucifix public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL,
    obj_salt public.objective_state DEFAULT 'irrelevant'::public.objective_state NOT NULL
);


ALTER TABLE public.games OWNER TO phasmouser;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: phasmouser
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_id_seq OWNER TO phasmouser;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: phasmouser
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: mutations; Type: TABLE; Schema: public; Owner: phasmouser
--

CREATE TABLE public.mutations (
    id integer NOT NULL,
    game uuid NOT NULL,
    type text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    new_value text
);


ALTER TABLE public.mutations OWNER TO phasmouser;

--
-- Name: mutations_id_seq; Type: SEQUENCE; Schema: public; Owner: phasmouser
--

CREATE SEQUENCE public.mutations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mutations_id_seq OWNER TO phasmouser;

--
-- Name: mutations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: phasmouser
--

ALTER SEQUENCE public.mutations_id_seq OWNED BY public.mutations.id;


--
-- Name: visitors; Type: TABLE; Schema: public; Owner: phasmouser
--

CREATE TABLE public.visitors (
    id integer NOT NULL,
    visitor text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    game uuid NOT NULL
);


ALTER TABLE public.visitors OWNER TO phasmouser;

--
-- Name: visitors_id_seq; Type: SEQUENCE; Schema: public; Owner: phasmouser
--

CREATE SEQUENCE public.visitors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.visitors_id_seq OWNER TO phasmouser;

--
-- Name: visitors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: phasmouser
--

ALTER SEQUENCE public.visitors_id_seq OWNED BY public.visitors.id;


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: mutations id; Type: DEFAULT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.mutations ALTER COLUMN id SET DEFAULT nextval('public.mutations_id_seq'::regclass);


--
-- Name: visitors id; Type: DEFAULT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.visitors ALTER COLUMN id SET DEFAULT nextval('public.visitors_id_seq'::regclass);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: games games_uuid_key; Type: CONSTRAINT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_uuid_key UNIQUE (uuid);


--
-- Name: mutations mutations_pk; Type: CONSTRAINT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.mutations
    ADD CONSTRAINT mutations_pk PRIMARY KEY (id);


--
-- Name: visitors visitors_pk; Type: CONSTRAINT; Schema: public; Owner: phasmouser
--

ALTER TABLE ONLY public.visitors
    ADD CONSTRAINT visitors_pk PRIMARY KEY (id);


--
-- Name: visitors_id_uindex; Type: INDEX; Schema: public; Owner: phasmouser
--

CREATE UNIQUE INDEX visitors_id_uindex ON public.visitors USING btree (id);


--
-- Name: visitors delete_dupes; Type: RULE; Schema: public; Owner: phasmouser
--

CREATE RULE delete_dupes AS
    ON INSERT TO public.visitors DO  DELETE FROM public.visitors
  WHERE ((visitors.visitor = new.visitor) AND (NOT (visitors.id IN ( SELECT foo.id
           FROM ( SELECT visitors_1.id
                   FROM public.visitors visitors_1
                  ORDER BY visitors_1.id DESC
                 LIMIT 5) foo))));


--
-- PostgreSQL database dump complete
--

