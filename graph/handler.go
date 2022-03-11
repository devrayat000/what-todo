package graph

import (
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/devRayat/todoapi/graph/generated"
	"github.com/devRayat/todoapi/graph/model"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"gorm.io/gorm"
)

func GraphqlHandler(db *gorm.DB) gin.HandlerFunc {
	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &Resolver{
		DB:         db,
		Subscriber: &Sub{},
		Observer: &Pub{
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

	return func(c *gin.Context) {
		srv.ServeHTTP(c.Writer, c.Request)
	}
}

// Defining the Playground handler
func PlaygroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/api/graphql")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}
