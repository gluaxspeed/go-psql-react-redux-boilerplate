package models

import (
	"time"
)

//Todo Object
type Todo struct {
	ID uint `db:"id" json:"id" gorm:"primary_key"`
	Title string `db:"title" json:"title" gorm:"type:varchar(100);not null"` //make it so it can't be null
	CreatedAt int64 `db:"created_at" json:"created_at"`
	Completed bool `db:"completed" json:"completed" sql:"DEFAULT:false"`
}

func NewTodo(title string) Todo {
	return Todo{
		CreatedAt: time.Now().UnixNano(),
		Title: title,
		Completed: false,
	}
}