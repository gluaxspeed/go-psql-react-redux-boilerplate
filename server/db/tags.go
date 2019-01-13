package db

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"ts/utils"
)

const tagName = "db"

type psTag struct {
	Default string
	Delete string
	Ignore bool
	ForeignKey bool
	ForeignKeyRef string
	Name string
	Nullable bool
	PrimaryKey bool
	Size int
	Type string
	Unique bool
	Update string
}

type psTags []*psTag

func (p psTags) String() string {
	var pkIndexes []int 

	var tstmt strings.Builder
	tstmt.WriteString("CREATE TABLE %s (\n")

	for index, tag := range p {
		var fieldStmt strings.Builder

		fieldStmt.WriteString(tag.Name + " ")

		if utils.StringInSlice(tag.Type, psSizeTypes) {
			if tag.Size > 0 {
				fieldStmt.WriteString(fmt.Sprintf("%s(%d)", tag.Type, tag.Size))
			} 
		} else {
			fieldStmt.WriteString(tag.Type)
		}
		
		if !tag.Nullable {
			fieldStmt.WriteString(" NOT NULL")
		}

		if tag.ForeignKey {
			fieldStmt.WriteString(" references " + tag.ForeignKeyRef)
		}

		if tag.PrimaryKey {
			pkIndexes = append(pkIndexes, index)
		}

		if tag.Unique {
			fieldStmt.WriteString(" UNIQUE")
		}

		if tag.Default != "" {
			fieldStmt.WriteString(" DEFAULT " + tag.Default)
		}

		tstmt.WriteString(fieldStmt.String() + ",\n")
	}

	if len(pkIndexes) >= 1 {
		var pkString strings.Builder
		pkString.WriteString("PRIMARY KEY (")

		for i := 0; i < len(pkIndexes) - 1; i++ {
			pkString.WriteString(p[pkIndexes[i]].Name + ", ")
		}

		pkString.WriteString(p[len(pkIndexes) - 1].Name + ")")
		tstmt.WriteString(pkString.String() + "\n")
	}

	tstmt.WriteString(");")
	return tstmt.String()
}

var psTypes = []string{
	"boolean",
	"char",
	"date",
	"float",
	"float8",
	"int",
	"interval",
	"real",
	"smallint",
	"serial",
	"time",
	"timestamp",
	"timestampz",
	"text",
	"uuid",
	"varchar",
}

var psSizeTypes = []string {
	"char",
	"varchar",
}

func GetPSTags(tag string) (*psTag, error) {
	tagsList := strings.Split(tag, ", ")

	ptag := &psTag{
		Ignore: false,
		ForeignKey: false,
		Nullable: true,
		PrimaryKey: false,
		Size: 0,
		Unique: false,
	}

	for _, tagValue := range tagsList {
		split := strings.Split(tagValue, ":")
		tag, value := split[0], split[0]
		if len(split) == 2 {
			value = split[1]
		}

		switch tag {
		case "default":
			ptag.Default = value

		case "-":
			ptag.Ignore = true

		case "references":
			ptag.ForeignKey = true
			ptag.ForeignKeyRef = value

		case "name":
			ptag.Name = value
		
		case "not_null":
			ptag.Nullable = false

		case "primary_key":
			ptag.PrimaryKey = true

		case "size":
			fmt.Sscanf(value, "%d", &ptag.Size)

		case "type":
			if !utils.StringInSlice(value, psTypes) {
				return nil, errors.New("Invalid type: " + ptag.Type)
			}
			ptag.Type = value

		case "unique":
			ptag.Unique = true

		default:
			return nil, errors.New("Invalid tag: " + tag)
		}
	}

	return ptag, nil
}

func ParseDBTags(s interface{}) (tablestmt string, err error) {
	value := reflect.ValueOf(s)

	var tags psTags

	for i := 0; i < value.NumField(); i++ {
		tag := value.Type().Field(i).Tag.Get(tagName)

		if tag == "" || tag =="-" {
			continue
		}

		t, err := GetPSTags(tag)
		if err != nil {
			return "", err
		}
		tags = append(tags, t)
	}


	return tags.String(), nil
}