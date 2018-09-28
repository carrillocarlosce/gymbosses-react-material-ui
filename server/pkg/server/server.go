package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/agparadiso/gymbosses/server/pkg/authentication"
	"github.com/agparadiso/gymbosses/server/pkg/clients"
	"github.com/agparadiso/gymbosses/server/pkg/users"
	"github.com/rs/cors"

	"github.com/gorilla/mux"
)

type Server struct {
	userSrv   users.UserSrv
	oauthSrv  authentication.OauthSrv
	clientSrv clients.ClientsSrv
}

func NewServer(userSrv users.UserSrv, oauthSrv *authentication.OauthSrv, clientsSrv clients.ClientsSrv) http.Handler {
	fmt.Println("Running gymbosses server...")
	s := &Server{userSrv: userSrv, oauthSrv: *oauthSrv, clientSrv: clientsSrv}
	r := mux.NewRouter()
	api := r.PathPrefix("/api/v1/").Subrouter()
	api.HandleFunc(`/`, s.login)
	api.HandleFunc(`/callback`, s.oauthCallback)
	api.HandleFunc(`/{gymname:[a-zA-Z0-9=\-\/]+}/checkin-history`, s.checkinHistory)
	api.HandleFunc(`/{gymname:[a-zA-Z0-9=\-\/]+}/clients`, s.clients)
	api.HandleFunc(`/{gymname:[a-zA-Z0-9=\-\/]+}/clients/new`, s.newClient)
	api.HandleFunc(`/{gymname:[a-zA-Z0-9=\-\/]+}/clients/{client_id:[0-9=\-\/]+}`, s.client)

	// Serve static assets directly.
	fs := http.FileServer(http.Dir("../client/static"))
	r.PathPrefix(`/static`).Handler(http.StripPrefix("/static", fs))

	r.PathPrefix(`/`).HandlerFunc(IndexHandler("../client/index.html"))

	handler := cors.Default().Handler(r)
	return handler
}

func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}

	return http.HandlerFunc(fn)
}

func (s *Server) oauthCallback(w http.ResponseWriter, r *http.Request) {
	userInfo, err := s.oauthSrv.OauthCallback(w, r)
	if err != nil {
		fmt.Printf(err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	//pending decide either to store or not the user
	_, _ = s.userSrv.IsExistingUser(userInfo.Email)

	http.Redirect(w, r, "https://gymbosses-frontend.herokuapp.com/someGym/dashboard/", http.StatusTemporaryRedirect)
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
