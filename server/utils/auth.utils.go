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
<<<<<<< HEAD
		Unauthorized:  auth.Unauthorized,
=======
		//Unauthorized: func(),
>>>>>>> 4470f5fb4db3c6c37e25f0821af3f13e2f8dab17
		TokenLookup:   "header:Authorization",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	}

	return authMiddleware
}
