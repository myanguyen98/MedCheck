
CREATE DATABASE medCheck_db;
USE medCheck_db;

CREATE TABLE meds
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	drugClass varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	dosage INTEGER,
	frequency INTEGER,
	doctor_Name varchar(255) NOT NULL,
	phoneNumber varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
