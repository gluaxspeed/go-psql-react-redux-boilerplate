package dbservices

import (
	"fmt"
	//"os"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
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