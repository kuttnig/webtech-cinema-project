-- use default from exercise-sheet
CREATE DATABASE webtech22cinema WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE webtech22cinema OWNER TO kek;

\connect webtech22cinema

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

-- create table threatres
CREATE TABLE public.theatres (
    theatre_id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    seats integer NOT NULL,
    is_dolby bool NOT NULL,
    is_3d bool NOT NULL,
    is_4d bool NOT NULL
);

ALTER TABLE public.theatres OWNER TO kek;

\copy public.theatres(name, seats, is_dolby, is_3d, is_4d) FROM './sample_data/theatres.csv' WITH (FORMAT CSV);

-- create table users
CREATE TABLE public.users (
    username varchar(15) PRIMARY KEY,
    password varchar(50) NOT NULL,
    is_admin bool NOT NULL
);

ALTER TABLE public.users OWNER TO kek;

\copy public.users(username, password, is_admin) FROM './sample_data/users.csv' WITH (FORMAT CSV);

-- create table movies
CREATE TABLE public.movies (
   movie_id serial PRIMARY KEY,
   name varchar(50) NOT NULL,
   description varchar(500) NOT NULL,
   duration int NOT NULL,
   age int NOT NULL
);

ALTER TABLE public.movies OWNER TO kek;

\copy public.movies(name, description, duration, age) FROM './sample_data/movies.csv' WITH (FORMAT CSV);

-- create table seats
CREATE TABLE public.seats (
    seat_id serial PRIMARY KEY,
    theatre_id int REFERENCES public.theatres(theatre_id) ON DELETE CASCADE,
    number  int  NOT NULL,
    row int NOT NULL,
    is_normal bool NOT NULL,
    is_deluxe bool NOT NULL,
    is_removable bool NOT NULL
);

ALTER TABLE public.seats OWNER TO kek;

\copy public.seats(theatre_id, number, row, is_normal, is_deluxe, is_removable) FROM './sample_data/seats.csv' WITH (FORMAT CSV);

-- create table reviews
CREATE TABLE public.reviews (
    review_id serial PRIMARY KEY,
    movie_id int REFERENCES public.movies(movie_id) ON DELETE CASCADE,
    username varchar(15) REFERENCES public.users(username) ON DELETE CASCADE,
    text varchar(500) NOT NULL,
    stars int NOT NULL
);

ALTER TABLE public.reviews OWNER TO kek;

\copy public.reviews(movie_id, username, text, stars) FROM './sample_data/reviews.csv' WITH (FORMAT CSV);

-- create table schedule
CREATE TABLE public.schedules (
    schedule_id serial PRIMARY KEY,
    movie_id integer REFERENCES public.movies(movie_id) ON DELETE CASCADE,
    theatre_id integer REFERENCES public.theatres(theatre_id) ON DELETE CASCADE,
    date date NOT NULL,
    time time NOT NULL
);

ALTER TABLE public.schedules OWNER TO kek;

\copy public.schedules(movie_id, theatre_id, date, time) FROM './sample_data/schedules.csv' WITH (FORMAT CSV);


-- create table tickets
CREATE TABLE public.tickets (
    ticket_id serial PRIMARY KEY,
    username varchar(15) REFERENCES public.users(username),
    schedule_id int REFERENCES public.schedules(schedule_id) ON DELETE CASCADE,
    seat_id int REFERENCES public.seats(seat_id) ON DELETE CASCADE
);

ALTER TABLE public.tickets OWNER TO kek;

\copy public.tickets(username, schedule_id, seat_id) FROM './sample_data/tickets.csv' WITH (FORMAT CSV);
