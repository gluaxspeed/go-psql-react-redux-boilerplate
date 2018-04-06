package utils

import (
	"time"

	"github.com/appleboy/gin-jwt"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/apis/auth"
)

func AuthMid() *jwt.GinJWTMiddleware {
	authMiddleware := &jwt.GinJWTMiddleware{
		Realm:         "localhost:3000",
		Key:           []byte("secret key"),
		Timeout:       time.Hour,
		MaxRefresh:    time.Hour * 24,
		Authenticator: auth.Authenticator,
		Authorizator:  auth.Authorizator,
		//Unauthorized: func(),
		TokenLookup:   "header:Authorization",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	}

	return authMiddleware
}
