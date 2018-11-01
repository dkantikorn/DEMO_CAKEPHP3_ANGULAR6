CREATE ROLE "demo-cake-angular" WITH LOGIN ENCRYPTED PASSWORD 'password';
CREATE DATABASE "demo-cake-angular"
WITH OWNER = "demo-cake-angular"
   ENCODING = 'UTF8'
   TABLESPACE = pg_default
   LC_COLLATE = 'en_US.utf8'
   LC_CTYPE = 'en_US.utf8'
   CONNECTION LIMIT = -1;
   
   
CREATE TABLE users
(
  id bigserial NOT NULL,
  username character varying(100) NOT NULL,
  password character varying(128) NOT NULL,
  first_name character varying(255) NOT NULL,
  last_name character varying(255) NOT NULL,
  gender character(1),
  birth_date date,
  mobile character varying(40),
  phone character varying(40),
  email character varying(40),
  picture_path character varying(512),
  status character(1) DEFAULT 'A'::bpchar,
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
  
-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES ('47', 'sarawutt.b', '$2y$10$s5AUhCgtCbva3KXFf1J4M.uZM3rF0oD3M9jkfRIYpcC9yy2V0Uhjm', 'sarawutt.b', 'bureekeaw', 'M', '2018-10-28', '08123456789', '023456789', 'sarawutt.b@pakgon.com', '/uploadfile/img/181028164438896029.jpg', 'A', '999', null, '2018-10-28 16:44:39', '2018-10-28 16:44:39');
INSERT INTO "public"."users" VALUES ('48', 'snaph', '$2y$10$meotx1mu3iTLmNRGkluDh.5TATR7ZWidpPNRkI23a47yr/ngHYIvq', 'snaph', 'haha', 'M', '2018-10-28', '08123456789', '023456789', 'snaph@pakgon.com', '/uploadfile/img/181028164730075767.jpg', 'A', '999', null, '2018-10-28 16:47:30', '2018-10-28 16:47:30');
INSERT INTO "public"."users" VALUES ('49', 'captain', '$2y$10$AovXLLf3wNuE7WGrcGyrnO3j3NQ.NMGl2pJh1zZqAAzpy4TZR.uTC', 'captain', 'america', 'M', '2018-10-28', '08123456789', '023456789', 'captain@pakgon.com', '/uploadfile/img/181028164932126610.jpg', 'A', '999', null, '2018-10-28 16:49:32', '2018-10-28 16:49:32');
INSERT INTO "public"."users" VALUES ('50', 'ironman', '$2y$10$XpPZ1OK904TCNy/G.UEvA.4G7o8EN//CVgcBGFaKB6mgMQQAXV58e', 'ironman', 'junior', 'M', '2018-10-28', '08123456789', '023456789', 'ironman@pakgon.com', '/uploadfile/img/181028165208297493.jpg', 'A', '999', null, '2018-10-28 16:52:08', '2018-10-28 16:52:08');
INSERT INTO "public"."users" VALUES ('51', 'potter', '$2y$10$7jBISE4ZD7vrzN2VG/7sb.eSK5YvCY.myEM8rkrwufUZHkRt5SNrO', 'potter', 'jame', 'M', '2018-10-28', '08123456789', '023456789', 'ironman@pakgon.com', '/uploadfile/img/181028165406185621.jpg', 'A', '999', null, '2018-10-28 16:54:06', '2018-10-28 16:54:06');
INSERT INTO "public"."users" VALUES ('52', 'voldemort', '$2y$10$jfMHLOyVWvDK4m5fdCtfx.YoeklvyBPLjUwdD37Qb/fwVioN/tBfG', 'voldemort', 'jame', 'M', '2018-10-28', '023456789', '08123456789', 'voldemort@pakgon.com', '/uploadfile/img/181028165618065222.jpg', 'A', '999', null, '2018-10-28 16:56:18', '2018-10-31 04:26:43');
