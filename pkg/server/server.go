package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	jose "gopkg.in/square/go-jose.v2"

	"github.com/agparadiso/gymbosses/pkg/account"
	"github.com/agparadiso/gymbosses/pkg/clients"
	"github.com/auth0-community/auth0"
	"github.com/rs/cors"

	"github.com/gorilla/mux"
)

type Server struct {
	accountSrv account.AccountSrv
	clientSrv  clients.ClientsSrv
}

func NewServer(accountSrv account.AccountSrv, clientsSrv clients.ClientsSrv) http.Handler {
	fmt.Println("Running gymbosses server...")
	s := &Server{accountSrv: accountSrv, clientSrv: clientsSrv}
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1/").Subrouter()
	api.HandleFunc(`/account/new`, s.newAccount)
	api.Handle(`/list-gyms`, authMiddleware(http.HandlerFunc(s.listGyms)))
	api.Handle(`/{gymID:[0-9=\-\/]+}/checkin-history`, authMiddleware(http.HandlerFunc(s.checkinHistory)))
	api.Handle(`/{gymID:[0-9=\-\/]+}/clients`, authMiddleware(http.HandlerFunc(s.clients)))
	api.Handle(`/{gymID:[0-9=\-\/]+}/clients/new`, authMiddleware(http.HandlerFunc(s.newClient)))
	api.Handle(`/{gymID:[0-9=\-\/]+}/clients/{client_id:[0-9=\-\/]+}`, authMiddleware(http.HandlerFunc(s.client)))

	handler := cors.AllowAll().Handler(r)
	return handler
}

func (s *Server) checkinHistory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	valid, err := s.accountSrv.ValidatePermissions(r.Header.Get("Authorization"), vars["gymID"])
	if !valid {
		w.WriteHeader(http.StatusForbidden)
		return
	}
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	var ckh *clients.CheckinHistoryResponse
	ckh = s.clientSrv.CheckinHistory(vars["gymID"])
	w.Header().Set("Content-Type", "application/json")
	body, _ := json.Marshal(ckh)
	w.Write(body)
}

func (s *Server) clients(w http.ResponseWriter, r *http.Request) {
	cliName := r.URL.Query().Get("name")
	var cli *clients.SearchClientResponse
	cli = s.clientSrv.SearchClients(cliName)
	w.Header().Set("Content-Type", "application/json")
	body, _ := json.Marshal(cli)
	w.Write(body)
}

func (s *Server) client(w http.ResponseWriter, r *http.Request) {
	var cli *clients.Client
	vars := mux.Vars(r)
	cli = s.clientSrv.SearchClientByID(vars["client_id"])
	w.Header().Set("Content-Type", "application/json")
	body, _ := json.Marshal(cli)
	w.Write(body)
}

func (s *Server) newClient(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf(err.Error())
		return
	}

	cli := clients.Client{}
	err = json.Unmarshal(body, &cli)
	if err != nil {
		fmt.Printf(err.Error())
		return
	}
	err = s.clientSrv.NewClient(&cli)
	if err != nil {
		fmt.Printf(err.Error())
		return
	}
}

func (s *Server) newAccount(w http.ResponseWriter, r *http.Request) {
	type newAccountRequest struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Country  string `json:"country"`
		Password string `json:"password"`
		GymName  string `json:"gym_name"`
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf(err.Error())
		return
	}
	defer r.Body.Close()
	ar := newAccountRequest{}
	err = json.Unmarshal(body, &ar)
	if err != nil {
		log.Printf(err.Error())
		return
	}

	if ar.Name == "" || ar.Email == "" || ar.Country == "" || ar.Password == "" || ar.GymName == "" {
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Incomplete parameters")
		return
	}

	err = s.accountSrv.SignUp(ar.Name, ar.Email, ar.GymName, ar.Country, ar.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Failed to SignUp: ", err.Error())
		return
	}
}

func (s *Server) listGyms(w http.ResponseWriter, r *http.Request) {
	var gyms *account.GymsResponse
	gyms, err := s.accountSrv.ListGyms(r.Header.Get("Authorization"))
	if err != nil {
		fmt.Println("ERROR: ", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	body, _ := json.Marshal(gyms)
	w.Write(body)
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var auth0Domain = "https://gymbosses.auth0.com/"
		var audience = "6xwu89vXD1KZ592IJobbbZU1d2Wq5iUg"
		client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: auth0Domain + ".well-known/jwks.json"}, nil)
		configuration := auth0.NewConfiguration(client, []string{audience}, auth0Domain, jose.RS256)
		validator := auth0.NewValidator(configuration, nil)

		_, err := validator.ValidateRequest(r)

		if err != nil {
			log.Println(err)
			log.Println("token is not valid")
			return
		}
		next.ServeHTTP(w, r)
	})
}
