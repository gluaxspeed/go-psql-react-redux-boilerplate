package routes

import (
	"github.com/gin-gonic/gin"
)

func InitServer() *gin.Engine {
	server := gin.Default()
	
	v1 := server.Group("/api/v1")
	{
		
		todos := v1.Group("/todos")
		{
			todos.GET("/", GetTodos)
			todos.GET("/:id", GetTodo)
			todos.POST("/", CreateTodo)
			todos.PUT("/:id", UpdateTodo)
			todos.DELETE("/:id", DeleteTodo)
		}
		
	}

	return server
}
