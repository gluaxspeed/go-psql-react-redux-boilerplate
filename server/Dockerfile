FROM golang:1.11.4

RUN mkdir -p /usr/src/server
ADD . /usr/src/server
WORKDIR /usr/src/server

RUN go get && go build && go get github.com/codegangsta/gin
ENV GIN_MODE=debug
CMD ["gin", "server.go"]