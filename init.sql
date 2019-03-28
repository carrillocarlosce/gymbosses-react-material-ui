CREATE TABLE account(
	id BIGSERIAL PRIMARY KEY,
	account_name VARCHAR (200) NOT NULL,
	email VARCHAR (200) NOT NULL,
	country VARCHAR (200) NOT NULL,
	account_password VARCHAR (200) NOT NULL
);

CREATE TABLE gym(
	id BIGSERIAL PRIMARY KEY,
	gym_name VARCHAR (200) NOT NULL
);

CREATE TABLE account_gym(
	account_id BIGINT NOT NULL,
	gym_id BIGINT NOT NULL,
	PRIMARY KEY(account_id, gym_id)
);

CREATE TABLE permissions_gym(
	account_id BIGINT NOT NULL,
	gym_id BIGINT NOT NULL,
	PRIMARY KEY(account_id, gym_id)
);

