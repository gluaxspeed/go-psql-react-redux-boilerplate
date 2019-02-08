package todo

import (
	"fmt"
	"ts/forms/todoforms"
	
	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

func Update(c *gin.Context) {
	var update todoforms.UpdateTodoForm
	err := c.ShouldBindJSON(&update)
	if err != nil {
		fmt.Println("plz", err)
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.AbortWithStatusJSON(400, gin.H{
			"status_code": 400,
			"message":     "Incorrect json format.",
			"error":       err.Error(),
		})
		return
	}

	claims := jwt.ExtractClaims(c)
	err = model.UpdateTodo(claims["uid"].(string), c.Param("id"), update)
	if err != nil {
		fmt.Println("plz2", err)
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.JSON(400, gin.H{
			"status_code": 400,
			"message":     "Failed to update todo.",
			"error":       err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status_code": 200,
		"message":     "Todo updated.",
	})
}
