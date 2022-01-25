#!/usr/bin/env bash

# STEP 1: Determinate the required values

PACKAGE="github.com/devRayat/todoapi"

PORT="3001"
ENV="production"

BUILD_DIR="bin"
BUILD_PATH="$BUILD_DIR/server.exe"

# STEP 2: Build the ldflags

while getopts "e:p:" opt; do
    case "$opt" in
        e) ENV="$OPTARG";;
        P) PORT="$OPTARG";;
    esac
done

LDFLAGS=(
  "-X 'main.DefaultPort=${PORT}'"
  "-X 'main.Env=${ENV}'"
)

# STEP 3: Actual Go build process

echo `go build -o "$BUILD_PATH" -ldflags="${LDFLAGS[*]}" .`

echo "Build with Environment=$ENV, PORT=$PORT"
