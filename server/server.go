package main

import (
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/routes"
)

func main() {
	server := routes.InitServer()

	server.Run(":3001")
}
