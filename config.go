package main

import (
	"fmt"
	"log"
	"net/url"

	"github.com/devRayat/todoapi/env"
)

type AppConfig struct {
	IsProd       bool
	AppUrl       *url.URL
	DBConnection string
}

const (
	DefaultPort  = 3001
	Env          = "development"
	DefaultDbCon = "host=localhost port=5432 user=postgres dbname=what-todo sslmode=disable password=ppooii12"
)

func DefaultAppConfig() *AppConfig {
	goenv := env.String("GO_ENV", Env)
	host := env.String("HOST", "http://localhost")
	port := env.Int("PORT", DefaultPort)
	dbConnectionString := env.String("DATABASE_CONNECTION", DefaultDbCon)

	appHost, err := url.Parse(fmt.Sprintf("%s:%d", host, port))
	if err != nil {
		log.Fatal("The environmental variable HOST or PORT is malformed")
	}

	return &AppConfig{
		IsProd:       goenv == "production",
		AppUrl:       appHost,
		DBConnection: dbConnectionString,
	}
}
