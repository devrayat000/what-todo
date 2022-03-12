package env

import (
	"os"
	"strconv"
)

func String(name string, defaultVal ...string) string {
	env := os.Getenv(name)
	if env == "" {
		return defaultVal[0]
	}
	return env
}

func Int(name string, defaultVal ...int) int {
	env := os.Getenv(name)
	if env == "" {
		return defaultVal[0]
	}

	i, err := strconv.Atoi(env)
	panicErr(err)
	return i
}

func Float(name string, defaultVal *float32) float32 {
	env := os.Getenv(name)
	if env == "" {
		return *defaultVal
	}

	f, err := strconv.ParseFloat(env, 32)
	panicErr(err)
	return float32(f)
}

func panicErr(err error) {
	if err != nil {
		panic(err)
	}
}
