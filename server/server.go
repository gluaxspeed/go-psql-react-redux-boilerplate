package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"ts/api"
)

type Task struct {
	closed chan struct{}
	server *http.Server
}

func (t *Task) Run() {
	for {
		select {
		case <- t.closed:
			return			
		}
	}
}

func (t *Task) Start() {
	err := t.server.ListenAndServe()
	if err != nil {
		log.Fatalf("listen: %s\n", err)
	}
}

func (t *Task) Stop() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := t.server.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}

	close(t.closed)
}

func main() {
	task := &Task{
		closed: make(chan struct{}),
		server: &http.Server{
			Addr: ":5555",
			Handler: api.InitRouter(),
		},
	}

	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt)

	go func() {
		select {
		case sig := <-c:
			log.Printf("Got %s signal. Aborting...\n", sig)
			task.Stop()
		}
	}()

	task.Start()
	task.Run()
}