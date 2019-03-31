package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"

	account "github.com/agparadiso/gymbosses/pkg/account/postgres"
	clients "github.com/agparadiso/gymbosses/pkg/clients/mock"
	"github.com/agparadiso/gymbosses/pkg/server"
)

func main() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	accountSrv := account.NewAccountSrv(db)
	clientsSrv := clients.NewClientsSrv()
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), server.NewServer(accountSrv, clientsSrv)))
}
