package todo

import (
	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	claims := jwt.ExtractClaims(c)

	todos, err := model.GetTodos(claims["uid"].(string))
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.JSON(400, gin.H{
			"status_code": 400,
			"message":     "Failed to get todos.",
			"error":       err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status_code": 200,
		"message":     "Success",
		"todos":      todos,
	})
}