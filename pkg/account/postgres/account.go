package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"strings"

	"github.com/agparadiso/gymbosses/pkg/account"
	"github.com/pkg/errors"
)

type accountSrv struct {
	db *sql.DB
}

func NewAccountSrv(db *sql.DB) account.AccountSrv {
	return &accountSrv{
		db: db,
	}
}

func (srv *accountSrv) SignUp(name, email, gymName, country, password string) error {
	var id int
	err := srv.db.QueryRow(fmt.Sprintf(getAccountByEmailQuery, email)).Scan(&id)
	if err == nil {
		return errors.Errorf("account with email %q already Exists", email)
	}
	if err != sql.ErrNoRows {
		return errors.Wrap(err, "failed to exec getAccountByEmailQuery")
	}

	accountID := 0
	err = srv.db.QueryRow(fmt.Sprintf(newAccountQuery, name, email, country, password)).Scan(&accountID)
	if err != nil {
		return errors.Wrap(err, "failed to exec newAccountQuery")
	}

	gymID := 0
	err = srv.db.QueryRow(fmt.Sprintf(newGymQuery, gymName)).Scan(&gymID)
	if err != nil {
		return errors.Wrap(err, "failed to exec newGymQuery")
	}

	_, err = srv.db.Exec(fmt.Sprintf(newAccountGymQuery, accountID, gymID))
	if err != nil {
		return errors.Wrap(err, "failed to exec newAccountGymQuery")
	}

	_, err = srv.db.Exec(fmt.Sprintf(createClientsTable, gymID))
	if err != nil {
		return errors.Wrap(err, "failed to exec createClientsTable")
	}

	return nil
}

func (srv *accountSrv) ListGyms(email string) (*account.GymsResponse, error) {
	var gymResponse account.GymsResponse
	var accountID int
	err := srv.db.QueryRow(fmt.Sprintf(getAccountByEmailQuery, email)).Scan(&accountID)
	if err != nil {
		return nil, errors.Wrap(err, "fail to get accountID")
	}

	var gymList []string
	rows, err := srv.db.Query(fmt.Sprintf(getAccesibleGyms, accountID))
	if err != nil {
		return nil, errors.Wrap(err, "fail to get accesible Gyms")
	}
	defer rows.Close()
	for rows.Next() {
		var gymID string
		if err := rows.Scan(&gymID); err != nil {
			log.Fatal(err)
		}
		gymList = append(gymList, gymID)
	}

	if len(gymList) > 0 {
		rows, err := srv.db.Query(fmt.Sprintf(getGymsData, strings.Join(gymList, ",")))
		if err != nil {
			return nil, errors.Wrap(err, "fail to get gym data")
		}
		for rows.Next() {
			var gym account.Gym
			if err := rows.Scan(&gym.ID, &gym.Name); err != nil {
				log.Fatal(err)
			}
			gymResponse = append(gymResponse, gym)
		}
	}
	return &gymResponse, nil
}

const newAccountQuery = `
INSERT INTO account(account_name, email, country, account_password)
VALUES ('%s', '%s', '%s', '%s')
RETURNING id
`
const newGymQuery = `
INSERT INTO gym(gym_name)
VALUES ('%s')
RETURNING id
`
const newAccountGymQuery = `
INSERT INTO account_gym(account_id, gym_id)
VALUES ('%d', '%d')
`
const getAccountByEmailQuery = `
SELECT id FROM account
WHERE email = '%s'
`
const createClientsTable = `
CREATE TABLE client_%d(
	id SERIAL PRIMARY KEY,
	identifier VARCHAR (200) NOT NULL,
	name VARCHAR (200) NOT NULL,
	email VARCHAR (200) NOT NULL,
	country VARCHAR (200) NOT NULL,
	birthdate DATE NOT NULL,
	phone VARCHAR (200) NOT NULL,
	contact_phone VARCHAR (200) NOT NULL,
	medical_insurance VARCHAR (200) NOT NULL,
	medical_emergency VARCHAR (200) NOT NULL,
	diseases VARCHAR (200) NOT NULL,
	how_meet_us VARCHAR (200) NOT NULL
);
`
const getAccesibleGyms = `
SELECT gym_id FROM permissions_gym
WHERE account_id = %d
`

const getGymsData = `
SELECT id, gym_name FROM gym
WHERE id in (%s)
`
