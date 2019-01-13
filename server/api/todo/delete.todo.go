package todo

import (	
	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

func Delete(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	err := model.DeleteTodo(claims["uid"].(string), c.Param("id"))
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.AbortWithStatusJSON(400, gin.H{
			"status_code": 400,
			"message":     "Incorrect json format.",
			"error":       err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status_code": 200,
		"message":     "Todo delted.",
	})
}