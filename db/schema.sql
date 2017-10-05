
CREATE DATABASE medCheck_db;
USE medCheck_db;

CREATE TABLE meds
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	drugClass varchar(255) NOT NULL,
	description TEXT NOT NULL,
	dosage varchar(255) NOT NULL,
	frequency varchar(255) NOT NULL,
    quantity varchar(255) NOT NULL,
	img TEXT NOT NULL,
	doctor_Name varchar(255) NOT NULL,
	phoneNumber varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
