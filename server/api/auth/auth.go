package auth

import (
	"time"

	"ts/models/usermodels"

	jwt "github.com/appleboy/gin-jwt"
)

var model usermodels.UserModel

func Init() error {
	return model.CreateTable()
}

// AuthMiddleware is a jwt middleware for auth requests
var AuthMiddleware = &jwt.GinJWTMiddleware{
	Realm:         "127.0.0.1",
	Key:           []byte("secret"),
	Timeout:       time.Hour,
	MaxRefresh:    time.Hour * 24,
	Authenticator: Authenticator,
	PayloadFunc:   PayloadFunc,
	Unauthorized:  Unauthorized,
	TokenLookup:   "header:Authorization, cookie: JWTToken",
	TokenHeadName: "Bearer",
	TimeFunc:      time.Now,
	SendCookie:    true,
	SecureCookie:  false,
}
