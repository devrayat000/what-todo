package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"log"

	"github.com/devRayat/todoapi/graph/generated"
	"github.com/devRayat/todoapi/graph/model"
	util "github.com/devRayat/todoapi/graph/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	todo := &model.Todo{
		Todo:        input.Todo,
		Description: input.Description,
	}

	columns := util.GetColumns(ctx)
	result := r.DB.Table("todo").Select("Todo", "Description").Clauses(clause.Returning{Columns: columns}).Create(todo)

	r.Subscriber.NewTodo = todo

	r.mu.Lock()
	for _, observer := range r.Observer.NewObservers {
		observer <- r.Subscriber.NewTodo
	}
	r.mu.Unlock()

	return todo, result.Error
}

func (r *mutationResolver) UpdateTodo(ctx context.Context, id string, input model.UpdateTodo) (*model.Todo, error) {
	updatedTodo := &model.Todo{ID: id}

	model := r.DB.Table("todo").Model(updatedTodo).Clauses(clause.Returning{})

	if input.Todo != nil {
		model = model.UpdateColumn("todo", *input.Todo)
	}
	if input.Description != nil {
		model = model.UpdateColumn("description", *input.Description)
	}

	result := model

	r.Subscriber.UpdatedTodo = updatedTodo

	r.mu.Lock()
	for _, observer := range r.Observer.UpdatedObservers {
		observer <- r.Subscriber.UpdatedTodo
	}
	r.mu.Unlock()

	return updatedTodo, result.Error
}

func (r *mutationResolver) DeleteTodo(ctx context.Context, id string) (*model.Todo, error) {
	todo := &model.Todo{ID: id}

	result := r.DB.Table("todo").Clauses(clause.Returning{}).Delete(todo)

	r.Subscriber.DeletedTodo = todo

	r.mu.Lock()
	for _, observer := range r.Observer.DeletedObservers {
		observer <- r.Subscriber.DeletedTodo
	}
	r.mu.Unlock()

	return todo, result.Error
}

func (r *mutationResolver) ToggleDone(ctx context.Context, id string) (*model.Todo, error) {
	todo := &model.Todo{ID: id}

	result := r.DB.Table("todo").Model(todo).Clauses(clause.Returning{}).UpdateColumn("done", gorm.Expr("NOT done"))

	return todo, result.Error
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	var todos []*model.Todo

	fields := util.GetPreloads(ctx)
	result := r.DB.Table("todo").Select(fields).Order("_id ASC").Find(&todos)

	return todos, result.Error
}

func (r *queryResolver) Todo(ctx context.Context, id string) (*model.Todo, error) {
	var todo *model.Todo

	fields := util.GetPreloads(ctx)
	result := r.DB.Table("todo").Select(fields).First(&todo, id)

	return todo, result.Error
}

func (r *subscriptionResolver) TodoAdded(ctx context.Context) (<-chan *model.Todo, error) {
	_id := util.RandString(8)
	log.Println("fired sub")
	todo := make(chan *model.Todo, 1)

	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(r.Observer.NewObservers, _id)
		r.mu.Unlock()
	}()

	r.mu.Lock()
	r.Observer.NewObservers[_id] = todo
	r.mu.Unlock()

	r.Observer.NewObservers[_id] <- r.Subscriber.NewTodo
	return todo, nil
}

func (r *subscriptionResolver) TodoUpdated(ctx context.Context, id string) (<-chan *model.Todo, error) {
	_id := util.RandString(8)

	todo := make(chan *model.Todo, 1)

	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(r.Observer.UpdatedObservers, _id)
		r.mu.Unlock()
	}()

	r.mu.Lock()
	r.Observer.UpdatedObservers[_id] = todo
	r.mu.Unlock()

	r.Observer.UpdatedObservers[_id] <- r.Subscriber.UpdatedTodo
	return todo, nil
}

func (r *subscriptionResolver) TodoDeleted(ctx context.Context, id string) (<-chan *model.Todo, error) {
	_id := util.RandString(8)

	todo := make(chan *model.Todo, 1)

	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(r.Observer.DeletedObservers, _id)
		r.mu.Unlock()
	}()

	r.mu.Lock()
	r.Observer.DeletedObservers[_id] = todo
	r.mu.Unlock()

	r.Observer.DeletedObservers[_id] <- r.Subscriber.DeletedTodo
	return todo, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
