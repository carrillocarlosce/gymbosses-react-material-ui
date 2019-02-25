CREATE TABLE account(
	id SERIAL PRIMARY KEY,
	account_name VARCHAR (200) NOT NULL,
	email VARCHAR (200) NOT NULL,
	country VARCHAR (200) NOT NULL,
	account_password VARCHAR (200) NOT NULL
);

CREATE TABLE gym(
	id SERIAL PRIMARY KEY,
	gym_name VARCHAR (200) NOT NULL
);

CREATE TABLE account_gym(
	account_id VARCHAR (200) NOT NULL,
	gym_id VARCHAR (200) NOT NULL,
	PRIMARY KEY(account_id, gym_id)
);

