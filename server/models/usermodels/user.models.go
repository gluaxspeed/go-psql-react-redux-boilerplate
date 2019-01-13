package usermodels

import (
	"errors"

	"ts/db"
	"ts/forms/userforms"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID string `db:"name:id, type:uuid, primary_key, default:uuid_generate_v4()" json:"id"`
	First string `db:"name:first, type:varchar, size:20, not_null" json:"first"`
	Last string `db:"name:last, type:varchar, size:20, not_null" json:"last"`
	Password string `db:"name:password, type:text, not_null" json:"-"`
	Email string `db:"name:email, type:text, unique, not_null" json:"email"`
}

type UserModel struct{}

func checkOne(email string) (err error) {
	gdb := db.GetDB()

	num, err := gdb.SelectInt("SELECT COUNT(id) FROM users WHERE email=LOWER($1) LIMIT 1", email)
	if err != nil {
		return err
	}

	if num > 0 {
		return errors.New("Field Already Exists")
	}

	return nil
}

func (m UserModel) CreateTable() (err error) {
	gdb := db.GetDB()
	err = gdb.CreateTable(User{}, "IF NOT EXISTS users")

	return err
}

func (m UserModel) SignUp(form userforms.SignUpForm) (user User, err error) {
	err = checkOne(form.Email)
	if err != nil {
		return user, err
	}

	if form.Password != form.PasswordConfirmation {
		return user, errors.New("Passwords do not match")
	}

	bytePass := []byte(form.Password)
	hashedPass, err := bcrypt.GenerateFromPassword(bytePass, bcrypt.DefaultCost)
	if err != nil {
		return user, err
	}

	gdb := db.GetDB()
	res, err := gdb.Exec(
		"INSERT INTO users(first, last, password, email) VALUES($1, $2, $3, $4)",
		form.First,
		form.Last,
		string(hashedPass),
		form.Email,
	)

	if res != nil && err == nil {
		row := gdb.QueryRow(
			"SELECT id, email FROM users WHERE email=LOWER($1) LIMIT 1",
			form.Email,
		)

		err = row.Scan(&user.ID, &user.Email)
		if err == nil {
			return user, nil
		}
	}

	return user, errors.New("Failed to register email already taken.")
}

func (m UserModel) SignIn(form userforms.SignInForm) (user User, err error) {
	gdb := db.GetDB()
	row := gdb.QueryRow("SELECT id, password, email FROM users WHERE email=LOWER($1) LIMIT 1", form.Email)
	
	err = row.Scan(&user.ID, &user.Password, &user.Email)
	if err != nil {
		return user, err
	}

	bytePassword := []byte(form.Password)
	byteHashedPassword := []byte(user.Password)

	err = bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)

	if err != nil {
		return user, errors.New("Invalid password")
	}

	user.Password = ""

	return user, nil
}

func (m UserModel) One(uid string) (user User, err error) {
	gdb := db.GetDB()
	row := gdb.QueryRow("SELECT id, email, first, last FROM users WHERE id=$1", uid)
	err = row.Scan(&user.ID, &user.Email, &user.First, &user.Last)
	return user, err
}