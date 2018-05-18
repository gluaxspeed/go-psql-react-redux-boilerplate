package auth

import (
	"github.com/gin-gonic/gin"
	"go-psql-react-redux-boilerplate/server/dbservices"
	"go-psql-react-redux-boilerplate/server/models"
	"golang.org/x/crypto/bcrypt"
)

func Authenticator(userId string, password string, con *gin.Context) (string, bool) {
	var user models.User

	db := dbservices.InitPSDB("jonathanpavlik", "postgres", "localhost", "5432", "test")
	defer db.Close()

	if err := db.Find(&user, "username = ?", userId).Error; err != nil {
		return userId, false
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(password)); err != nil {
		return userId, false
	}

	return userId, true
}
