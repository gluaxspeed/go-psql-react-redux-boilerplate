FROM golang:latest
RUN go get github.com/gin-gonic/gin
RUN go get github.com/lib/pq
RUN go get github.com/jinzhu/gorm
RUN go get github.com/codegangsta/gin
RUN go get gopkg.in/gorp.v1
RUN mkdir -p /usr/src/server
ADD . /usr/src/server/
WORKDIR /usr/src/server
RUN go build main.go
ENV PORT 8080
