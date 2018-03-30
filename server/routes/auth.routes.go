package routes

import (
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/apis/auth"
	"github.com/gluaxspeed/go-psql-react-redux-boilerplate/server/apis/creator"
)

func AuthRoutes(server *gin.Engine, jwt *jwt.GinJWTMiddleware) {
	var auths []creator.APIFN
	auths = append(
		auths,
		creator.APIFN{
			auth.Register,
			"/register",
			false,
			creator.POST,
		})

	auths = append(
		auths,
		creator.APIFN{
			jwt.LoginHandler,
			"/login",
			false,
			creator.POST,
		})

	auths = append(
		auths,
		creator.APIFN{
			jwt.RefreshHandler,
			"/refresh_token",
			true,
			creator.GET,
		})

	creator.AddGroup(server, jwt, "v1", "auth", auths)

}
