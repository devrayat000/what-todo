package graph

import (
	"context"
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
)

const (
	ContextKey string = "ILoveYou"
)

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), ContextKey, c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func GinContextFromContext(ctx context.Context) (*gin.Context, error) {
	ginContext := ctx.Value(ContextKey)
	if ginContext == nil {
		err := fmt.Errorf("could not retrieve gin.Context")
		return nil, err
	}

	gc, ok := ginContext.(*gin.Context)
	if !ok {
		err := fmt.Errorf("gin.Context has wrong type")
		return nil, err
	}
	return gc, nil
}

func GetUserID(ctx context.Context) (*string, error) {
	gc, err := GinContextFromContext(ctx)

	if err != nil {
		fmt.Println("could not retrieve gin.Context")
	}

	sessionContainer, err := session.GetSession(gc.Request, gc.Writer, nil)

	if err != nil {
		err = supertokens.ErrorHandler(err, gc.Request, gc.Writer)
		if err != nil {
			return nil, errors.New("")
		}
		return nil, err
	}

	userID := sessionContainer.GetUserID()
	return &userID, nil
}
