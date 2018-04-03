package dbservices

import (
	"fmt"
	//"os"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"

	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/models"
)

func InitPSDB(user string, pass string, host string, port string, dbname string) *gorm.DB {
	ConnInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host,
		port,
		user,
		pass,
		dbname,
	)

	db, err := gorm.Open("postgres", ConnInfo)
	if err != nil {
		fmt.Println(err)
	}

	return db
}

func CheckTable(db *gorm.DB, tableStruct interface{}) {

	switch tableType := tableStruct.(type) {
	case *models.User:
		Table := db.HasTable(tableType)

		if !Table {
			db.Exec(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
			db.CreateTable(tableType)
		}

	default:
		fmt.Printf("I don't know about type %T!\n", tableType)
	}

}
