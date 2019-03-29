package postgres

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/agparadiso/gymbosses/pkg/account"
	"github.com/dgrijalva/jwt-go"
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
	err := singUpAuth0(email, password)
	if err != nil {
		return errors.Wrap(err, "Failed to signup on Auth0")
	}

	err = srv.signupDB(name, email, gymName, country, password)
	if err != nil {
		return errors.Wrap(err, "Failed to signup on DB")
	}

	return nil
}

func (srv *accountSrv) ListGyms(authToken string) (*account.GymsResponse, error) {
	email := extractAccountEmail(authToken)

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

	var gymResponse account.GymsResponse
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

func (srv *accountSrv) ValidatePermissions(authToken, gymID string) (bool, error) {
	validGyms, err := srv.ListGyms(authToken)
	if err != nil {
		return false, errors.Wrap(err, "failed to validate Permissions")
	}

	valid := false
	for _, g := range *validGyms {
		if g.ID == gymID {
			valid = true
		}
	}
	return valid, nil
}

func (srv *accountSrv) signupDB(name, email, gymName, country, password string) error {
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

	_, err = srv.db.Exec(fmt.Sprintf(newPermissionsGymQuery, accountID, gymID))
	if err != nil {
		return errors.Wrap(err, "failed to exec newPermissionsGymQuery")
	}

	_, err = srv.db.Exec(fmt.Sprintf(createClientsTable, gymID))
	if err != nil {
		return errors.Wrap(err, "failed to exec createClientsTable")
	}

	return nil
}

func singUpAuth0(email, password string) error {
	const signupURL = "https://gymbosses.auth0.com/dbconnections/signup"
	const clientID = "6xwu89vXD1KZ592IJobbbZU1d2Wq5iUg"
	const connectionName = "Username-Password-Authentication"

	type authSignup struct {
		ClientID   string `json:"client_id"`
		Email      string `json:"email"`
		Password   string `json:"password"`
		Connection string `json:"connection"`
	}

	p, err := json.Marshal(&authSignup{
		ClientID:   clientID,
		Email:      email,
		Password:   password,
		Connection: connectionName,
	})
	if err != nil {
		log.Println("Failed to marshal authSignup")
	}
	payload := strings.NewReader(string(p))

	req, _ := http.NewRequest("POST", signupURL, payload)

	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)
	if res.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(res.Body)
		return fmt.Errorf(string(body))
	}
	return nil
}

func extractAccountEmail(authToken string) string {
	splitToken := strings.Split(authToken, "Bearer")
	token := strings.TrimSpace(splitToken[1])

	claims := jwt.MapClaims{}
	jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(""), nil
	})
	return claims["name"].(string)
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
const newPermissionsGymQuery = `
INSERT INTO permissions_gym(account_id, gym_id)
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
