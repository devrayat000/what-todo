package main

import (
	"log"
	"os"
	"time"

	"github.com/devRayat/todoapi/graph/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func SetupDB(dsn string) *gorm.DB {
	log.Println("Setting up Postgres database ...")
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second, // Slow SQL threshold
			LogLevel:                  logger.Info, // Log level
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,        // Disable color
		},
	)
	// newLogger;
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})

	if err != nil {
		log.Fatalf("Error while setting up DB -> %s", err)
	}

	log.Println("Database initialised")

	db.AutoMigrate(&model.Todo{})
	log.Println("Database migration complete")
	return db
}
