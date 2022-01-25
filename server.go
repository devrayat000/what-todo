package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"

	"github.com/devRayat/todoapi/graph"
	"github.com/devRayat/todoapi/graph/generated"
	"github.com/devRayat/todoapi/graph/model"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"gorm.io/gorm"
)

var (
	config *AppConfig
	db     *gorm.DB
)

func main() {
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

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4000", "http://localhost:8080"},
		AllowCredentials: true,
		Debug:            false,
	})

	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB:         db,
		Subscriber: &graph.Sub{},
		Observer: &graph.Pub{
			NewObservers:     map[string]chan *model.Todo{},
			UpdatedObservers: map[string]chan *model.Todo{},
			DeletedObservers: map[string]chan *model.Todo{},
		},
	}}))

	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	srv.Use(extension.Introspection{})

	// http.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", c.Handler(srv))

	log.Printf("GraphQL server running at http://localhost%s/query", port)

	if !config.IsProd {
		graph.ConfigurePlayground("/query")
		log.Printf("GraphQL playground running at http://localhost%s/playground", port)
	}

	log.Fatal(http.ListenAndServe(port, nil))

}

func handleGraphQL() *handler.Server {
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,

		// NewTodo:       &model.Todo{},
		// TodoObservers: map[string]chan *model.Todo{},
	}}))

	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	srv.Use(extension.Introspection{})

	return srv
}
