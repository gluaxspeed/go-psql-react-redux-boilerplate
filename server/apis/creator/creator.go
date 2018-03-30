package creator

import (
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

type HTTP string

const (
	GET    = HTTP("GET")
	DELETE = HTTP("DELETE")
	POST   = HTTP("POST")
	PUT    = HTTP("PUT")
)

type APIFN struct {
	FN      func(con *gin.Context)
	ROUTE   string
	PRIVATE bool
	METHOD  HTTP
}

func action(route *gin.RouterGroup, jwt *jwt.GinJWTMiddleware, element APIFN) {
	if element.PRIVATE {
		route.Use(jwt.MiddlewareFunc())
	}

	switch element.METHOD {
	case GET:
		route.GET(element.ROUTE, element.FN)
		break

	case DELETE:
		route.DELETE(element.ROUTE, element.FN)
		break

	case POST:
		route.POST(element.ROUTE, element.FN)
		break

	case PUT:
		route.PUT(element.ROUTE, element.FN)
		break
	}
}

func AddGroup(server *gin.Engine, jwt *jwt.GinJWTMiddleware, version string, api string, fns []APIFN) {
	v := server.Group("/api/" + version)
	{

		route := v.Group(api)
		{

			for _, element := range fns {
				action(route, jwt, element)
			}

		}
	}

}
