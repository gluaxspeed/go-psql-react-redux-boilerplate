package models

import (
	"github.com/jinzhu/gorm"
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
	ID       uuid.UUID `gorm:"primary_key;type:uuid;" db:"id" json:"id"`
	Username string    `db:"username" json:"username" gorm:"type:varchar(20); not null"`
	Password []byte    `db:"password" json:"password" gorm:"type:bytea; not null"`
	First    string    `db:"firstname" json:"firstname" gorm:"type:varchar(20); not null"`
	Last     string    `db:"lastname" json:"lastname" gorm:"type:varchar(20); not null"`
	Email    string    `db:"email" json:"email" gorm:"type:varchar(40); not null"`
	Role     UserRole  `db:"role" json:"role" gorm:"type:varchar(10);`
}

func (user *User) BeforeCreate(scope *gorm.Scope) error {
	u2, err := uuid.NewV4()
	if err != nil {
		return err
	}
	scope.SetColumn("id", u2)
	return nil
}

func NewUser(uname string, pass []byte, first string, last string, email string) User {
	return User{
		Username: uname,
		Password: pass,
		First:    first,
		Last:     last,
		Email:    email,
		Role:     NORM,
	}
}
