package auth

import "github.com/gin-gonic/gin"

func Unauthorized(con *gin.Context, code int, message string) {
	con.JSON(code, gin.H{
		"code":    code,
		"message": message,
	})
}
