-- initialize the database

/* create tables */
-- create table to hold user profiles
DROP TABLE "user_profiles";
CREATE TABLE "user_profiles" (
  ID SERIAL PRIMARY KEY,
  last_name VARCHAR,
  middle_name VARCHAR,
  first_name VARCHAR,
  user_name VARCHAR UNIQUE
);

-- create table to hold projects, a project has several stages
DROP TABLE "projects";
CREATE TABLE "projects" (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id SERIAL
);

-- create table for projects saved state
DROP TABLE "saved_state";
CREATE TABLE "saved_state" (
  ID SERIAL PRIMARY KEY,
  user_id SERIAL,
  project_id SERIAL,
  project_stage VARCHAR,
  selected BOOLEAN
);

-- create table to hold stages
DROP TABLE "stages";
CREATE TABLE "stages" (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

/* insert values in tables */
-- insert values in user_profiles table
INSERT INTO "user_profiles" (last_name, middle_name, first_name, user_name)
  VALUES ('Chis', 'Dorel', 'Alin', 'alinchis');

-- insert values in the projects table
INSERT INTO "projects" (name, user_id)
  VALUES ('Lumen Index', 1), ('Testing', 1), ('Exploratory', 1), ('Other', 1);

-- initiate the saved state
INSERT INTO "saved_state" (user_id, project_id, project_stage, selected)
  VALUES (1, 1, 1, TRUE), (1, 1, 1, FALSE), (1, 1, 1, FALSE);

-- insert values in stages table
INSERT INTO "stages" (ID, name)
  VALUES (1, 'questions'), (2, 'dataset'), (3, 'aquisition'), (4, 'processing'), (5, 'visualization'), (6, 'writing'), (7, 'sharing'), (8, 'messaging');
