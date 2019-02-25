package postgres

import (
	"database/sql"
	"fmt"

	"github.com/agparadiso/gymbosses/pkg/account"
	"github.com/davecgh/go-spew/spew"
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

func (srv *accountSrv) IsExistingAccount(email string) (bool, error) {
	return false, nil
}

func (srv *accountSrv) SignUp(name, email, gymName, country, password string) error {
	fmt.Println("SignUp")
	res, err := srv.db.Exec(fmt.Sprintf(newAccountQuery, name, email, country, password))
	if err != nil {
		return errors.Wrap(err, "failed to exec newAccountQuery")
	}

	spew.Dump(res)

	res, err = srv.db.Exec(fmt.Sprintf(newGymQuery, gymName))
	if err != nil {
		return errors.Wrap(err, "failed to exec newGymQuery")
	}

	spew.Dump(res)
	return nil
}

const newAccountQuery = `
INSERT INTO account(account_name, email, country, account_password)
VALUES ('%s', '%s', '%s', '%s')
`

const newGymQuery = `
INSERT INTO gym(gym_name)
VALUES ('%s')
`
