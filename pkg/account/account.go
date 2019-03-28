package account

type Gym struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type GymsResponse []Gym

type Account struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Country  string `json:"country"`
	Password []byte `json:"password"`
	Gym      *Gym   `json:"gym"`
}

type AccountSrv interface {
	SignUp(name, email, gymName, country, password string) error
	ListGyms(email string) (*GymsResponse, error)
}
