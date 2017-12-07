-- initialize the schema
CREATE SCHEMA sws.dataset;

-- install postgis
CREATE TABLE dataset.test (
  ID SERIAL PRIMARY KEY,
  last_name VARCHAR,
  middle_name VARCHAR,
  first_name VARCHAR,
  user_name VARCHAR UNIQUE
);
