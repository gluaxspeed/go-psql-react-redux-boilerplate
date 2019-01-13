package userforms

type SignUpForm struct {
	First string `json:"first" binding:"required"`
	Last string `json:"last" binding:"required"`
	Email string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	PasswordConfirmation string `json:"password_confirmation" binding:"required"`
}

type SignInForm struct {
	Email string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}