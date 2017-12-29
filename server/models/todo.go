package models

import (
	"time"
    _ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/satori/go.uuid"
)

//Todo Object
type Todo struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" db:"id" json:"id"`
	Title string `db:"title" json:"title" gorm:"type:varchar(100);not null"` //make it so it can't be null
	CreatedAt int64 `db:"created_at" json:"created_at"`
	Completed bool `db:"completed" json:"completed" gorm:"DEFAULT:false"`
}

func NewTodo(title string) Todo {
	return Todo{
		CreatedAt: time.Now().UnixNano(),
		Title: title,
		Completed: false,
	}
}