package main

import (
	"log"
	"net/http"
	"os"

	"github.com/agparadiso/gymbosses/pkg/authentication"

	clients "github.com/agparadiso/gymbosses/pkg/clients/mock"
	"github.com/agparadiso/gymbosses/pkg/server"
	users "github.com/agparadiso/gymbosses/pkg/users/mock"
)

func main() {
	userSrv := users.NewUsersSrv()
	oauthSrv := authentication.NewOauthSrv()
	clientsSrv := clients.NewClientsSrv()
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), server.NewServer(userSrv, oauthSrv, clientsSrv)))
}
