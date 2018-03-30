package auth

import "github.com/gin-gonic/gin"

func Authenticator(userId string, password string, con *gin.Context) (string, bool) {
	if userId == "test" && password == "test" || userId == "admin" && password == "admin" {
		return userId, true
	}

	return userId, false
}
