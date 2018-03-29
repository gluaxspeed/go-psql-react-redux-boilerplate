package creator

import "github.com/gin-gonic/gin"

type HTTP string

const (
	GET    = HTTP("GET")
	DELETE = HTTP("DELETE")
	POST   = HTTP("POST")
	PUT    = HTTP("PUT")
)

type APIFN struct {
	FN     func(con *gin.Context)
	ROUTE  string
	METHOD HTTP
}

func AddGroup(server *gin.Engine, version string, api string, fns []APIFN) {
	v := server.Group("/api/" + version) {

		a := v.Group(api) {

			for _, element := range fns {
				switch element.METHOD {
				case GET:
					a.GET(element.ROUTE, element.FN)
				case DELETE:
					a.DELETE(element.ROUTE, element.FN)
				case POST:
					a.POST(element.ROUTE, element.FN)
				case PUT:
					a.PUT(element.ROUTE, element.FN)
				}
			}

		}
	}

}
