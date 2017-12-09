package main

import (
	"./routes"
)

func main() {
	server := routes.InitServer()

	server.Run(":3001")
}
