package todoforms

type AddTodoForm struct {
	Todo string `json:"todo" binding:"required"`
}

type UpdateTodoForm struct {
	Completed bool `json:"completed" binding:"exists"`
}