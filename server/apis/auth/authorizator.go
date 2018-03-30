package auth

import "github.com/gin-gonic/gin"

func Authorizator(userId string, con *gin.Context) bool {
	if userId == "admin" {
		return true
	}
	return false
}
