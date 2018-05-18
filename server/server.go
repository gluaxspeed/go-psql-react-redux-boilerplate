package main

import (
	"os"

	"go-psql-react-redux-boilerplate/server/routes"
)

func main() {
	port := os.Getenv("PORT")
	server := routes.InitServer()

	if port == "" {
		port = "3001"
	}

	server.Run(":" + port)
}
