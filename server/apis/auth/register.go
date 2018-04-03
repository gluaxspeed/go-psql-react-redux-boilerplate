package auth

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/dbservices"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/models"
	//"golang.org/x/crypto/bcrypt"
)

func register(username string, password string, first string, last string) bool {
	return true
}

func Register(con *gin.Context) {
	var json models.Register

	db := dbservices.InitPSDB("jonathanpavlik", "postgres", "localhost", "5432", "test")
	defer db.Close()

	dbservices.CheckTable(db, &models.User{})

	if err := con.ShouldBindJSON(&json); err != nil {
		fmt.Println("failed binding json")
	}

	if json.Pass != json.PassConf {
		con.JSON(500, gin.H{
			"error": "pass != passconf",
		})
		return
	}
	/*
		fmt.Printf("uname: %s, pass before: %s\n", json.Username, json.Password)

		hash, _ := bcrypt.GenerateFromPassword([]byte(json.Password), bcrypt.DefaultCost)

		fmt.Printf("pass after: %s\n", hash)

		tq := "qwerty"

		if err := bcrypt.CompareHashAndPassword(hash, []byte(tq)); err != nil {
			// TODO: Properly handle error
			fmt.Println("invalid")
		} else {
			fmt.Println("Valid")
		}
	*/
	con.JSON(200, gin.H{
		"code":    "reeee",
		"message": "tilt",
	})
}
