package main

import (
	"fmt"
	"log"
	"net/url"
	"os"
)

type AppConfig struct {
	IsProd       bool
	AppUrl       *url.URL
	DBConnection string
}

var (
	DefaultPort = "8080"
	Env         = "development"
)

func DefaultAppConfig() *AppConfig {
	env := os.Getenv("GO_ENV")
	if env == "" {
		env = Env
	}

	host := os.Getenv("HOST")
	if host == "" {
		// log.Fatal("The environment variable HOST doesn't exist")
		host = "http://localhost"
	}

	port := os.Getenv("PORT")
	if port == "" {
		// log.Fatal("The environment variable PORT doesn't exist")
		port = DefaultPort
	}

	appHost, err := url.Parse(fmt.Sprintf("%s:%s", host, port))
	if err != nil {
		log.Fatal("The environmental variable HOST or PORT is malformed")
	}

	dbConnectionString := os.Getenv("DATABASE_CONNECTION")
	if dbConnectionString == "" {
		// log.Fatal("The environment variable PORT doesn't exist")
		dbConnectionString = "host=localhost port=5432 user=postgres dbname=todo-db sslmode=disable password=ppooii12"
	}

	return &AppConfig{
		IsProd:       env == "production",
		AppUrl:       appHost,
		DBConnection: dbConnectionString,
	}
}
