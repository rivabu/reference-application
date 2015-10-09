DROP TABLE country;
DROP TABLE continent;
--DROP SEQUENCE hibernate_sequence;

--CREATE SEQUENCE hibernate_sequence START WITH 1000;

CREATE TABLE continent (
  cont_id    INT(11)  AUTO_INCREMENT      NOT NULL,
  cont_name  VARCHAR(20)  NOT NULL,
  CONSTRAINT continent_pk PRIMARY KEY (cont_id),
  CONSTRAINT continent_uk UNIQUE (cont_name)
);

INSERT INTO continent (cont_id, cont_name) VALUES (1, 'Africa');
INSERT INTO continent (cont_id, cont_name) VALUES (2, 'Asia');
INSERT INTO continent (cont_id, cont_name) VALUES (3, 'Europe');
INSERT INTO continent (cont_id, cont_name) VALUES (4, 'North America');
INSERT INTO continent (cont_id, cont_name) VALUES (5, 'South America');
INSERT INTO continent (cont_id, cont_name) VALUES (6, 'Oceania');
INSERT INTO continent (cont_id, cont_name) VALUES (7, 'Antarctica');
COMMIT;

CREATE TABLE country (
  ctry_id         INT(11)  AUTO_INCREMENT      NOT NULL,
  cont_id         INT(11)        NOT NULL,
  ctry_name       VARCHAR(50)  NOT NULL,
  area            INT(11)        NOT NULL,
  pop             INT(11)        NOT NULL,
  pop_upd_on      DATE,
  currency        VARCHAR(50)  NOT NULL,
  CONSTRAINT country_pk PRIMARY KEY (ctry_id),
  CONSTRAINT country_uk UNIQUE (ctry_name)
);

INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
VALUES(14, 3, 'Germany', 137847, 82046000, '2008-12-01', 'Euro');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(48, 1, 'Ghana', 92098, 23837000, null, 'Cedi');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(53, 6, 'Australia', 2966200, 21884000, '2008-12-01', 'Australian Dollar');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(73, 3, 'Greece', 50949, 11257285, '2008-12-01', 'Euro');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(122, 3, 'Georgia', 26900, 4382100, '2008-12-01', 'Lari');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(123, 6, 'New Zealand', 104454, 4320300, '2008-12-01', 'New Zealand Dollar');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(147, 1, 'Gambia', 4361, 1705000, null, 'Dalasi');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(149, 1, 'Gabon', 103347, 1475000, null, 'CFA franc');
INSERT INTO country (ctry_id, cont_id, ctry_name, area, pop, pop_upd_on, currency)
  VALUES(171, 3, 'pain', 504645, 46704314, null, 'Euro');
COMMIT;