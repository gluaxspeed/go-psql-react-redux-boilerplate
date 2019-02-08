package auth

import (
"fmt"
"github.com/gin-gonic/gin"
)

// Unauthorized a default jwt gin function, called when authentication is failed.
func Unauthorized(c *gin.Context, code int, message string) {
	fmt.Println("cookies", message)
	for i, cookie := range c.Request.Cookies() {
        fmt.Println(i, cookie.Name)
   }
	c.JSON(code, gin.H{
		"status_code": code,
		"message":     message,
	})
}