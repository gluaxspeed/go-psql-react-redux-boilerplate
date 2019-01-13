package auth

import "github.com/gin-gonic/gin"

// Unauthorized a default jwt gin function, called when authentication is failed.
func Unauthorized(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{
		"status_code": code,
		"message":     message,
	})
}