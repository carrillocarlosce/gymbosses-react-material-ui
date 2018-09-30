package main

import (
	"log"
	"net/http"
	"os"

	"github.com/agparadiso/gymbosses/server/pkg/authentication"

	clients "github.com/agparadiso/gymbosses/server/pkg/clients/mock"
	"github.com/agparadiso/gymbosses/server/pkg/server"
	users "github.com/agparadiso/gymbosses/server/pkg/users/mock"
)

func main() {
	userSrv := users.NewUsersSrv()
	oauthSrv := authentication.NewOauthSrv()
	clientsSrv := clients.NewClientsSrv()
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), server.NewServer(userSrv, oauthSrv, clientsSrv)))
}
