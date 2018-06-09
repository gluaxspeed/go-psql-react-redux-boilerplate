package auth

import (
	"fmt"
	"github.com/badoux/checkmail"
	"github.com/gin-gonic/gin"
	"go-psql-react-redux-boilerplate/server/dbservices"
	"go-psql-react-redux-boilerplate/server/models"
	"golang.org/x/crypto/bcrypt"
)

func Register(con *gin.Context) {
	var json models.Register
	var user models.User

	db := dbservices.InitPSDB("jonathanpavlik", "postgres", "localhost", "5432", "test")
	defer db.Close()

	dbservices.CheckTable(db, &models.User{})

	if err := con.ShouldBindJSON(&json); err != nil {
		fmt.Println(err)
		return
	}

	lookup := db.Where("username = ?", json.User).Or("email = ?", json.Email)
	if err := lookup.Find(&user).Error; err == nil {
		con.JSON(400, gin.H{
			"error": "Username or email is taken.",
		})
		return
	}

	if json.Pass != json.PassConf {
		con.JSON(400, gin.H{
			"error": "Your password and password confirmation do not match.",
		})
		return
	}

	if err := checkmail.ValidateFormat(json.Email); err != nil {
		con.JSON(400, gin.H{
			"error": "Invalid email.",
		})
		return
	}

	verr := checkmail.ValidateHost(json.Email)
	if verr != nil {
		con.JSON(400, gin.H{
			"error": "Invalid email host.",
		})
		return
	}

	if smtpErr, ok := verr.(checkmail.SmtpError); ok && verr != nil {
		fmt.Printf("Code: %s, Msg: %s", smtpErr.Code(), smtpErr)
		con.JSON(400, gin.H{
			"error": "Email does not exist.",
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

	if err := db.Create(&user).Error; err != nil {
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