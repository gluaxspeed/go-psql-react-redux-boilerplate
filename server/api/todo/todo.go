package todo

import (
	"ts/models/todomodels"
)

var model todomodels.TodoModel

func Init() error {
	return model.CreateTable()
}
