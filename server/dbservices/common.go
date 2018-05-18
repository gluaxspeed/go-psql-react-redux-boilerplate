package dbservices

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"

	"go-psql-react-redux-boilerplate/server/models"
)

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
