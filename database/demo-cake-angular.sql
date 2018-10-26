-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  id bigserial NOT NULL,
  username character varying(100) NOT NULL,
  password character varying(128) NOT NULL,
  firstname character varying(255) NOT NULL,
  lastname character varying(255) NOT NULL,
  gender character(1),
  birthdate date,
  moblie character varying(40),
  phone character varying(40),
  email character varying(40),
  picture_path character varying(512),
  status character(1) DEFAULT 'A',
  create_uid bigint NOT NULL,
  update_uid bigint,
  created timestamp without time zone NOT NULL,
  modified timestamp without time zone,
  CONSTRAINT user_personals_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO "demo-cake-angular";