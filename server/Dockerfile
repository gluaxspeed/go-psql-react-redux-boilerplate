FROM golang:alpine
RUN mkdir -p /go/src/github.com/gluaxspeed/go-psql-react-redux-boilerplate/server
WORKDIR /go/src/github.com/gluaxspeed/go-psql-react-redux-boilerplate/server
COPY . .
RUN apk update
RUN apk add git
RUN go get -d -v ./...
RUN go install -v ./...
ARG mode=debug
ENV GIN_MODE=debug
CMD ["server"]