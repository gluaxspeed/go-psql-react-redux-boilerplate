package db

import (
  "database/sql"
  "log"
  "fmt"

  "ts/config"

  _ "github.com/lib/pq"
)

type DB struct {
  con *sql.DB
}

var db DB

func Init() {
  psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
  "password=%s dbname=%s sslmode=disable",
  config.Config["POSTGRES_HOST"],
  config.Config["POSTGRES_PORT"],
  config.Config["POSTGRES_USER"],
  config.Config["POSTGRES_PASSWORD"],
  config.Config["POSTGRES_DBNAME"],
  )

  err := db.ConnectDB(psqlInfo)
  if err != nil {
    fmt.Println("this one", psqlInfo)
  	log.Fatal(err)
  }

  _, err = db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
  if err != nil {
    log.Fatal(err)
  }
}

func (db *DB) ConnectDB(psqlInfo string) (err error) {
	db.con, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		return err
	}

	if err = db.con.Ping(); err != nil {
		return err
	}

	return err
}

func (db *DB) CreateTable(table interface{}, name string) (error) {
  tstmt, err := ParseDBTags(table)
  if err != nil {
    return err
  }

  tstmt = fmt.Sprintf(tstmt, name)
  fmt.Println(tstmt)
  _, err = db.Exec(tstmt)
  if err != nil {
    return err
  }

  return err
}

func (db *DB) Exec(stmt string, args ...interface{}) (sql.Result, error) {
  return db.con.Exec(stmt, args...)
}

func (db *DB) SelectInt(stmt string, args ...interface{}) (value int, err error) {
  err = db.con.QueryRow(stmt, args...).Scan(&value)
  return value, err
}

func (db *DB) Query(stmt string, args ...interface{}) (*sql.Rows, error) {
  return db.con.Query(stmt, args...)
}

func (db *DB) QueryRow(stmt string, args ...interface{}) *sql.Row {
  return db.con.QueryRow(stmt, args...)
}

func GetDB() DB {
	return db
}