package api

import (
	// "errors"

	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

// The http type is a type for HTTP request types.
type httpMethod string

// The http request types.
const (
	GET    httpMethod = "GET"
	DELETE httpMethod = "DELETE"
	PATCH  httpMethod = "PATCH"
	POST   httpMethod = "POST"
	PUT    httpMethod = "PUT"
)

// Default Error Messages
const (
	NotFoundError = "404 PAGE NOT FOUND"
)

// APIAction is the core of how you can easily add routes to the server.
type APIAction struct {
	Func    func(gin *gin.Context)
	Route   string
	Private bool
	Method  httpMethod
}

// NewRoute takes a function that takes gin context, endpoint, whether the route should be login protected, and method type.
// This returns a pointer to a APIAction.
func NewRoute(action func(c *gin.Context), endpoint string, private bool, method httpMethod) APIAction {
	return APIAction{
		Func:    action,
		Route:   endpoint,
		Private: private,
		Method:  method,
	}
}


// action takes the APIAction method and creates a gin route of that type.
// Also makes the route private if it labeled as private in the apiaction.
func (a *APIAction) action(route *gin.RouterGroup, jwt *jwt.GinJWTMiddleware) {
	if a.Private {
		route.Use(jwt.MiddlewareFunc())
	}

	switch a.Method {
	case GET:
		route.GET(a.Route, a.Func)
		break
	case DELETE:
		route.DELETE(a.Route, a.Func)
		break
	case PATCH:
		route.PATCH(a.Route, a.Func)
		break
	case POST:
		route.POST(a.Route, a.Func)
		break
	case PUT:
		route.PUT(a.Route, a.Func)
		break
	}
}

// AddRoutes takes a gin server, gin jwt instance, version number as a string,
// api endpoint name and a list of APIActions to add to it.
func AddRoutes(router *gin.Engine, jwt *jwt.GinJWTMiddleware, version, api string, fns []APIAction) {

	ver := router.Group("/api/v" + version)
	{
		route := ver.Group(api)
		{

			for _, fn := range fns {
				fn.action(route, jwt)
			}

		}
	}

}
