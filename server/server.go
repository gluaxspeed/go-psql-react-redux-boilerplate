package main

import (
  "github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/routes"
)

func func main() {
  server := routes.InitServer()

  //log.Fatal(autotls.Run(server, "bingecringers.com"))
  server.Run(":3001")
}
