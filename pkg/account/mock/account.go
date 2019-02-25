package mock

import "database/sql"

type AccountSrv struct {
	db *sql.DB
}

func NewAccountSrv(db *sql.DB) *AccountSrv {
	return &AccountSrv{
		db: db,
	}
}

func (srv *AccountSrv) IsExistingAccount(email string) (bool, error) {
	return false, nil
}

func (srv *AccountSrv) SignUp(name, email, gymName, country, password string) error {
	return nil
}
