package auth

import (
	"ts/forms/userforms"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var register userforms.SignUpForm

	err := c.ShouldBindJSON(&register)
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.AbortWithStatusJSON(400, gin.H{
			"status_code": 400,
			"message":     "Incorrect json format.",
			"error":       err.Error(),
		})
		return
	}

	user, err := model.SignUp(register)
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		c.AbortWithStatusJSON(400, gin.H{
			"status_code": 400,
			"message":     "Creating User Failed.",
			"error":       err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"status_code": 200,
		"message":     "User created.",
		"user": user,
	})
}