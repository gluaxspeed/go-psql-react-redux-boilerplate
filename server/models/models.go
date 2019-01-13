package models

type Model interface {
	CreateTable() (err error)
}