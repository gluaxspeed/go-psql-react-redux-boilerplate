package auth

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/models"
	"golang.org/x/crypto/bcrypt"
)

func register(username string, password string, first string, last string) bool {
	return true
}

func Register(con *gin.Context) {
	var json models.Login

	con.BindJSON(&json)

	fmt.Printf("pass before: %s\n", json.Password)

	hash, _ := bcrypt.GenerateFromPassword([]byte(json.Password), bcrypt.DefaultCost)

	fmt.Printf("pass after: %s\n", hash)

	con.JSON(200, gin.H{
		"code":    "reeee",
		"message": "tilt",
	})
}
