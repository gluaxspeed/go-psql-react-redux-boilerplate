package routes

import (
	"fmt"
	"log"
	"os"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"

	"../models"
)

func CheckErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

func InitDb() *gorm.DB {
	ConnInfo := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable",
		"postgres",
		os.Getenv("POSTGRES_PASSWORD"),
		"postgres",
		"5432",
		"postgres",
	)
	db, err := gorm.Open("postgres", ConnInfo)
	//defer db.Close()
	CheckErr(err, "Failed sql.Open")

	Table := db.HasTable(&models.Todo{})
	if !Table {
		err := db.CreateTable(&models.Todo{}).Error
		CheckErr(err, "Failed to create table")
	}

	return db
}

var db = InitDb()

func GetTodos(context *gin.Context) {
	var Todos []models.Todo

	err := db.Order("id", true).Find(&Todos).Error
	CheckErr(err, "Failed query to select all")
	
	context.JSON(http.StatusOK, Todos)
}

func GetTodo(context *gin.Context) {
	id := context.Params.ByName("id")

	var todo models.Todo
	var err error
	err = db.Find(&todo, "id = ?", id).Error

	CheckErr(err, "Failed to find todo")

	
	context.JSON(http.StatusOK, todo)
}

func CreateTodo(context *gin.Context) {
	var todo models.Todo
	
	if context.BindJSON(&todo) == nil {
		t := models.NewTodo(todo.Title)
		var err = db.Create(&todo).Error
		CheckErr(err, "Failed to create todo")
		context.JSON(http.StatusCreated, t)
	}
	
}

func UpdateTodo(context *gin.Context) {
	id := context.Params.ByName("id")

	var todo models.Todo
	var err error

	err = db.Find(&todo, "id = ?", id).Error

	if err == nil && context.BindJSON(&todo) == nil {
		db.Save(&todo)
		context.JSON(http.StatusOK, todo)
		return
	}

	context.JSON(http.StatusNotFound, nil)
}

func DeleteTodo(context *gin.Context) {
	id := context.Params.ByName("id")

	var todo models.Todo
	var err error

	err = db.Find(&todo, "id = ?", id).Error
	CheckErr(err, "Could not find todo with id")
	err = db.Delete(&todo).Error

	if err != nil {
		context.JSON(http.StatusOK, todo)
		return
	}

	context.JSON(http.StatusNotFound, nil)
	CheckErr(err, "Delete todo failed")
}
