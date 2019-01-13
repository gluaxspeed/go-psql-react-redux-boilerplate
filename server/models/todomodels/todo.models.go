package todomodels

import (
	//"errors"

	"ts/db"
	"ts/forms/todoforms"
)

type Todo struct {
	ID string `db:"name:id, type:uuid, primary_key, default:uuid_generate_v4()" json:"id"`
	UID string `db:"name:uid, type:uuid, references: users(id), not_null" json:"uid"`
	Todo string `db:"name:todo, type:text, not_null" json:"todo"`
	Completed bool `db:"name:completed, type:boolean, not_null" json:"completed"`
}

type TodoModel struct{}

func (m TodoModel) CreateTable() (err error) {
	gdb := db.GetDB()
	err = gdb.CreateTable(Todo{}, "IF NOT EXISTS todos")

	return err
}

func (m TodoModel) AddTodo(uid string, form todoforms.AddTodoForm) (todo Todo, err error) {
	gdb := db.GetDB()

	_, err = gdb.Exec(
		"INSERT INTO todos(uid, todo, completed) VALUES($1, $2, $3)",
		uid,
		form.Todo,
		false,
	)

	return todo, err
}

func (m TodoModel) DeleteTodo(uid, id string) (err error) {
	gdb := db.GetDB()

	_, err = gdb.Exec(
		"DELETE FROM todos WHERE id=$1",
		id,
	)
	return err
}

func (m TodoModel) GetTodos(uid string) (todos []Todo, err error) {
	gdb := db.GetDB()

	rows, err := gdb.Query("SELECT id, todo, completed FROM todos WHERE uid=$1", uid)
	if err != nil {
		return todos, err
	}
	defer rows.Close()

	var todo Todo
	for rows.Next() {
		err = rows.Scan(&todo.ID, &todo.Todo, &todo.Completed)
		if err != nil {
			return todos, err
		}

		todos = append(todos, todo)
	}

	err = rows.Err()
	if err != nil {
		return todos, err
	}

	return todos, nil	
}

func (m TodoModel) UpdateTodo(uid, id string, form todoforms.UpdateTodoForm) error {
	gdb := db.GetDB()
	_, err := gdb.Exec(
		"UPDATE todos SET completed=$1 WHERE id=$2 AND uid=$3",
		form.Completed,
		id,
		uid,
	)

	if err != nil {
		return err
	}

	return nil
}