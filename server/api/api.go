package api

import (
	"fmt"
	"net/http"

	"ts/api/auth"
	"ts/api/todo"
	"ts/db"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func init() {
	db.Init()
	err := auth.Init()
	fmt.Println(err)
	err = todo.Init()
	fmt.Println(err)
}

func NotFound(c *gin.Context) {
	c.Writer.Header().Add("Content-Type", "application/json+error")
	c.AbortWithStatusJSON(
		http.StatusNotFound,
		gin.H{
			"status_code": http.StatusNotFound,
			"message":     NotFoundError,
		},
	)
}

func InitRouter() *gin.Engine {
	router := gin.New()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	config.AllowHeaders = append(config.AllowHeaders, "Authorization", "Content-Type")
	router.Use(cors.New(config))

	// middlewares
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	var authEndpoints = []APIAction{
		NewRoute(auth.AuthMiddleware.LoginHandler, "login", false, POST),
		NewRoute(auth.AuthMiddleware.RefreshHandler, "refresh_token", false, GET),
		NewRoute(auth.Register, "register", false, POST),
		NewRoute(func(c *gin.Context) {
			c.JSON(200, gin.H{"valid": true})
		}, "validate", true, GET),
	}
	AddRoutes(router, auth.AuthMiddleware, "1", "auth", authEndpoints)

	var todoEndpoints = []APIAction{
		NewRoute(todo.New, "new", true, POST),
		NewRoute(todo.Delete, "delete/:id", true, POST),
		NewRoute(todo.GetAll, "get", true, GET),
		NewRoute(todo.Update, "update/:id", true, POST),
	}
	AddRoutes(router, auth.AuthMiddleware, "1", "todo", todoEndpoints)

	router.NoRoute(NotFound)

	return router
}