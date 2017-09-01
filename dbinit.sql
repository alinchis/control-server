DROP DATABASE IF EXISTS sws;
CREATE DATABASE sws;

\c puppies;

CREATE TABLE "Projects" (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
);

INSERT INTO pups (name)
  VALUES ('Lumen_Index'), ('Test'), ('Exploratory');
