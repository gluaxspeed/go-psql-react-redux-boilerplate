package todo

import (
	"ts/forms/todoforms"
	
	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

func New(c *gin.Context) {
	var new todoforms.AddTodoForm
	err := c.ShouldBindJSON(&new)
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.AbortWithStatusJSON(400, gin.H{
			"status_code": 400,
			"message":     "Incorrect json format.",
			"error":       err.Error(),
		})
		return
	}

	claims := jwt.ExtractClaims(c)
	todo, err := model.AddTodo(claims["uid"].(string), new)
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.JSON(400, gin.H{
			"status_code": 400,
			"message":     "Failed to get todos.",
			"error":       err.Error(),
		})
		return
	}

	c.JSON(201, gin.H{
		"status_code": 201,
		"message":     "Todo created.",
		"todo": todo,
	})
}