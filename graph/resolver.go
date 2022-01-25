package graph

//go:generate go run github.com/99designs/gqlgen generate
import (
	"sync"

	"github.com/devRayat/todoapi/graph/model"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB         *gorm.DB
	mu         sync.Mutex
	Subscriber *Sub
	Observer   *Pub
}

type Pub struct {
	NewObservers     map[string]chan *model.Todo
	UpdatedObservers map[string]chan *model.Todo
	DeletedObservers map[string]chan *model.Todo
}

type Sub struct {
	NewTodo     *model.Todo
	UpdatedTodo *model.Todo
	DeletedTodo *model.Todo
}
