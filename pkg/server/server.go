package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	jose "gopkg.in/square/go-jose.v2"

	"github.com/agparadiso/gymbosses/pkg/account"
	"github.com/agparadiso/gymbosses/pkg/authentication"
	"github.com/agparadiso/gymbosses/pkg/clients"
	"github.com/auth0-community/auth0"
	"github.com/rs/cors"

	"github.com/gorilla/mux"
)

type Server struct {
	accountSrv account.AccountSrv
	oauthSrv   authentication.OauthSrv
	clientSrv  clients.ClientsSrv
}

func NewServer(accountSrv account.AccountSrv, oauthSrv *authentication.OauthSrv, clientsSrv clients.ClientsSrv) http.Handler {
	fmt.Println("Running gymbosses server...")
	s := &Server{accountSrv: accountSrv, oauthSrv: *oauthSrv, clientSrv: clientsSrv}
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1/").Subrouter()
	api.HandleFunc(`/`, s.login)
	api.HandleFunc(`/account/new`, s.newAccount)
	api.Handle(`/{gymname:[a-zA-Z0-9=\-\/]+}/checkin-history`, authMiddleware(http.HandlerFunc(s.checkinHistory)))
	api.Handle(`/{gymname:[a-zA-Z0-9=\-\/]+}/clients`, authMiddleware(http.HandlerFunc(s.clients)))
	api.Handle(`/{gymname:[a-zA-Z0-9=\-\/]+}/clients/new`, authMiddleware(http.HandlerFunc(s.newClient)))
	api.Handle(`/{gymname:[a-zA-Z0-9=\-\/]+}/clients/{client_id:[0-9=\-\/]+}`, authMiddleware(http.HandlerFunc(s.client)))

	handler := cors.Default().Handler(r)
	return handler
}

func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	s.oauthSrv.LoginGoogleProvider(w, r)
}

func (s *Server) checkinHistory(w http.ResponseWriter, r *http.Request) {
	cliID := r.URL.Query().Get("id")
	var ckh *clients.CheckinHistoryResponse
	ckh = s.clientSrv.CheckinHistory(cliID)
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
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Failed to SignUp: ", err.Error())
		return
	}
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var auth0Domain = "https://gymbosses.auth0.com/"
		var audience = "6xwu89vXD1KZ592IJobbbZU1d2Wq5iUg"
		client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: auth0Domain + ".well-known/jwks.json"})
		configuration := auth0.NewConfiguration(client, []string{audience}, auth0Domain, jose.RS256)
		validator := auth0.NewValidator(configuration)

		_, err := validator.ValidateRequest(r)

		if err != nil {
			log.Println(err)
			log.Println("token is not valid")
			return
		}
		next.ServeHTTP(w, r)
	})
}
