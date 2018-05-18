package routes

import (
	"github.com/gin-gonic/gin"

	"go-psql-react-redux-boilerplate/server/apis/creator"
	"go-psql-react-redux-boilerplate/server/utils"
)

func InitServer() *gin.Engine {
	server := gin.Default()

	//logger
	server.Use(gin.Logger())

	//recovery middleware for panics
	server.Use(gin.Recovery())

	jwt := utils.AuthMid()

	var test []creator.APIFN
	test = append(test, creator.APIFN{
		func(con *gin.Context) {
			con.JSON(200, gin.H{
				"message": "welcome to test api creator",
			})
		},
		"/",
		false,
		creator.GET,
	})

	creator.AddGroup(server, jwt, "v1", "test", test)
	AuthRoutes(server, jwt)

	server.NoRoute(func(con *gin.Context) {
		con.JSON(404, gin.H{
			"code":    "PAGE_NOT_FOUND",
			"message": "page not found error",
		})
	})

	return server
}
