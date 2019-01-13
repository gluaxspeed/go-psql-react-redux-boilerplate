package config

import (
	"os"

 "github.com/joho/godotenv"
 )

var Config map[string]string

func init() {
	env := os.Getenv("GO_ENV")
	if "" == env {
		env = "dev"
	}

	Config, _ = godotenv.Read(".env." + env)
}