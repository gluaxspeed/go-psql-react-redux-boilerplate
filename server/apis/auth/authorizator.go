package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/dbservices"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/models"
)

func Authorizator(userId string, con *gin.Context) bool {
	var user models.User

	db := dbservices.InitPSDB("jonathanpavlik", "postgres", "localhost", "5432", "test")
	defer db.Close()

	if err := db.Find(&user, "id = ?", userId).Error; err == nil {
		return false
	}

	return true
}
