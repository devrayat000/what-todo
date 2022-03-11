package main

import (
	"fmt"
	"log"

	"github.com/supertokens/supertokens-golang/supertokens"

	"github.com/devRayat/todoapi/graph"
	m "github.com/devRayat/todoapi/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	config *AppConfig
	db     *gorm.DB
)

func main() {
	server := gin.Default()
	config = DefaultAppConfig()

	port := fmt.Sprintf(":%s", config.AppUrl.Port())
	dsn := config.DBConnection

	db = SetupDB(dsn)

	conn, err := db.DB()
	if err != nil {
		log.Println(err)
		panic("failed to connect database")
	}

	defer conn.Close()

	SuperToken()

	server.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
		AllowHeaders: append([]string{"content-type"},
			supertokens.GetAllCORSHeaders()...),
		AllowCredentials: true,
	}))

	server.Use(SuperToken())
	server.GET("/sessioninfo", m.VerifySession(nil), m.Sessioninfo)

	// --- Graphql
	server.POST("/api/graphql", graph.GraphqlHandler(db))
	log.Printf("GraphQL server running at http://localhost%s/graphql", port)

	if !config.IsProd {
		server.GET("/graphql", graph.PlaygroundHandler())
		log.Printf("GraphQL playground running at http://localhost%s/playground", port)
	}
	// --- Graphql

	server.Run(port)
}
