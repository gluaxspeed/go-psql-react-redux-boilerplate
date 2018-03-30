package models

import (
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/satori/go.uuid"
	//"time"
)

type UserRole string

const (
	ADMIN = UserRole("admin")
	NORM  = UserRole("norm")
)

type Login struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Register struct {
	Username string
	Password string
	First    string
	Last     string
	Email    string
}

type User struct {
	Username string
	Password string
	First    string
	Last     string
	Email    string
	Role     UserRole
	ID       uuid.UUID
}

func NewUser(uname string, pass string, first string, last string) User {
	return User{
		Username: uname,
		Password: pass,
		First:    first,
		Last:     last,
		Role:     NORM,
	}
}
