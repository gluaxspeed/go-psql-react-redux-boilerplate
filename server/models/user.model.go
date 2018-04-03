package models

import (
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/satori/go.uuid"
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
	User     string `json:"username" binding:"required"`
	Pass     string `json:"password" binding:"required"`
	PassConf string `json:"passwordConf" binding:"required"`
	First    string `json:"first_name" binding:"required"`
	Last     string `json:"last_name" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

type User struct {
	Username string    `db:"username" json:"username" gorm:"type:varchar(100); not null"`
	Password string    `db:"password" json:"password" gorm:"type:varchar(100); not null"`
	First    string    `db:"firstname" json:"firstname" gorm:"type:varchar(100); not null"`
	Last     string    `db:"lastname" json:"lastname" gorm:"type:varchar(100); not null"`
	Email    string    `db:"email" json:"email" gorm:"type:varchar(100); not null"`
	Role     UserRole  `db:"role" json:"role" gorm:"type:varchar(10);`
	ID       uuid.UUID `gorm:"primary_key;type:uuid;default:uuid_generate_v4()" db:"id" json:"id"`
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
