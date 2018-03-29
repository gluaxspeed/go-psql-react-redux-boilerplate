package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/apis/creator"
)

func InitServer() *gin.Engine {
	server := gin.Default()

	//logger
	//server.Use(gin.Logger())

	//recovery middleware for panics
	//server.Use(gin.Recovery())

	var test []creator.APIFN
	test = append(test, creator.APIFN{
		func(con *gin.Context) {
			con.JSON(200, gin.H{
				"message": "welcome to test api creator",
			})
		},
		"/",
		creator.HTTP("GET"),
	})

	creator.AddGroup(server, "v1", "test", test)

	server.NoRoute(func(con *gin.Context) {
		con.JSON(404, gin.H{
			"code":    "PAGE_NOT_FOUND",
			"message": "page not found error",
		})
	})

	return server
}
