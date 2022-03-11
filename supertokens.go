package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func SuperToken() gin.HandlerFunc {
	apiBasePath := "/api/auth"
	// websiteBasePath := "/"
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			// try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
			ConnectionURI: "http://localhost:3567",
			// APIKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
		},
		AppInfo: supertokens.AppInfo{
			AppName:       "What Todo",
			APIDomain:     "http://localhost:3001",
			WebsiteDomain: "http://localhost:3000",
			APIBasePath:   &apiBasePath,
			// WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			session.Init(nil),
			emailpassword.Init(nil),
		},
	})

	if err != nil {
		panic(err.Error())
	}

	return func(c *gin.Context) {
		supertokens.Middleware(http.HandlerFunc(
			func(rw http.ResponseWriter, r *http.Request) {
				c.Next()
			})).ServeHTTP(c.Writer, c.Request)
		// we call Abort so that the next handler in the chain is not called, unless we call Next explicitly
		c.Abort()
	}
}
