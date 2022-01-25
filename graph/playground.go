package graph

import (
	"net/http"

	"github.com/jensneuse/graphql-go-tools/pkg/playground"
)

func ConfigurePlayground(endpoint string) {
	handlers, _ := playground.New(playground.Config{PlaygroundPath: "/playground", GraphqlEndpointPath: endpoint}).Handlers()

	for _, config := range handlers {
		http.Handle(config.Path, config.Handler)
	}
}
