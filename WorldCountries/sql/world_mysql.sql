------------------------------------------------- drop table
DROP TABLE ctry;

------------------------------------------------- County

CREATE TABLE ctry (
  ctry_id         NUMBER AUTO_INCREMENT,
  ctry_name       VARCHAR2(50)  NOT NULL,
  ctry_area       NUMBER        NOT NULL,
  ctry_pop        NUMBER        NOT NULL,
  CONSTRAINT ctry_pk  PRIMARY KEY (ctry_id),
  CONSTRAINT ctry_uk UNIQUE (ctry_name)
);

DROP SEQUENCE ctry_seq;
CREATE SEQUENCE ctry_seq;
CREATE OR REPLACE TRIGGER ctry_trg
  BEFORE INSERT ON ctry FOR EACH ROW
BEGIN 
    IF :NEW.ctry_id IS NULL THEN
      SELECT ctry_seq.NEXTVAL INTO :NEW.ctry_id FROM DUAL;
    END IF;
END;
/

INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Germany', 137847, 82046000);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Ghana', 92098, 23837000);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Australia', 2966200, 21884000);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Greece', 50949, 11257285);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Georgia', 26900, 4382100);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('New Zealand', 104454, 4320300);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Gambia', 4361, 1705000);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Gabon', 103347, 1475000);
INSERT INTO ctry (ctry_name, ctry_area, ctry_pop)
  VALUES('Serbia', 34116, 7120666);
COMMIT;