package auth

import (
	"fmt"
	"ts/forms/userforms"

	"github.com/gin-gonic/gin"
	jwt "github.com/appleboy/gin-jwt"
)

func Authenticator(c *gin.Context) (interface{}, error) {
	var login userforms.SignInForm
	if err := c.ShouldBindJSON(&login); err != nil {
		fmt.Println("this sucks:", login, err)
		return "Missing login values.", jwt.ErrMissingLoginValues
	}

	user, err := model.SignIn(login)
	if err != nil {
		c.Writer.Header().Add("Content-Type", "application/json+error")
		return gin.H{
			"status_code": 400,
			"message":     "Signing in Failed.",
			"error":       err.Error(),
		}, err
	}

	return user, nil
}