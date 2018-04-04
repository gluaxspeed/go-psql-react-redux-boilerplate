package auth

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/dbservices"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/models"
	"golang.org/x/crypto/bcrypt"
)

func register(username string, password string, first string, last string) bool {
	return true
}

func Register(con *gin.Context) {
	var json models.Register
	var user models.User

	db := dbservices.InitPSDB("jonathanpavlik", "postgres", "localhost", "5432", "test")
	defer db.Close()

	dbservices.CheckTable(db, &models.User{})

	if regerr := con.ShouldBindJSON(&json); regerr != nil {
		fmt.Println(regerr)
		return
	}

	if finderr := db.Find(user, "username = ?", json.User).Error; finderr != nil {

	}

	if json.Pass != json.PassConf {
		con.JSON(400, gin.H{
			"error": "Your password and password confirmation do not match.",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(json.Pass), bcrypt.DefaultCost)
	if err != nil {
		con.JSON(500, gin.H{
			"error": "Failed to generate hash",
		})
		return
	}

	user = models.NewUser(json.User, hash, json.First, json.Last, json.Email)
	fmt.Println(user.ID)

	err = db.Create(&user).Error
	if err != nil {
		fmt.Println(err)
		return
	}
	/*
		fmt.Printf("uname: %s, pass before: %s\n", json.Username, json.Password)

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
