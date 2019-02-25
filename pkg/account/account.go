package account

type Gym struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Account struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Country  string `json:"country"`
	Password []byte `json:"password"`
	Gym      *Gym   `json:"gym"`
}

type AccountSrv interface {
	IsExistingAccount(email string) (bool, error)
	SignUp(name, email, gymName, country, password string) error
}
