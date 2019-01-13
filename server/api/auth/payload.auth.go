package auth

import (
	jwt "github.com/appleboy/gin-jwt"

	"ts/models/usermodels"
)

// PayloadFunc uses the User's courses as jwt claims.
func PayloadFunc(data interface{}) jwt.MapClaims {
	switch data.(type) {
	case usermodels.User:
		user := data.(usermodels.User)
		return jwt.MapClaims{
			"uid":         user.ID,
		}
	default:
		return jwt.MapClaims{}
	}
}
