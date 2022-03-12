package main

import (
	"log"
	"net/http"

	"github.com/devRayat/todoapi/env"
	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
)

const (
	DefaultApiDomain     = "http://localhost:3001"
	DefaultWebsiteDomain = "http://localhost:3000"
	DefaultConnectionURI = "http://localhost:3567"
)

func SuperToken() gin.HandlerFunc {
	apiBasePath := "/api/auth"
	// websiteBasePath := "/"
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			// try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
			ConnectionURI: env.String("SUPERTOKENS_CONNECTION_URI", DefaultConnectionURI),
			// APIKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
		},
		AppInfo: supertokens.AppInfo{
			AppName:       "What Todo",
			APIDomain:     env.String("SUPERTOKENS_API_DOMAIN", DefaultApiDomain),
			WebsiteDomain: env.String("SUPERTOKENS_WEBSITE_DOMAIN", DefaultWebsiteDomain),
			APIBasePath:   &apiBasePath,
			// WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			session.Init(nil),
			emailpassword.Init(nil),
		}, OnGeneralError: func(err error, req *http.Request, res http.ResponseWriter) {
			if err != nil {
				log.Fatal(err)
				res.WriteHeader(500)
				res.Write([]byte(err.Error()))
			}
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
