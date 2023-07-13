#!/bin/bash

root_folder="src"
folders=(
  "authentication"
  "controllers"
  "database"
  "documentation"
  "middlewares"
  "routes"
  "services"
  "utils"
  "validations"
)

mkdir -p "$root_folder"

for folder in "${folders[@]}"
do
  mkdir -p "$root_folder/$folder"
  touch "$root_folder/$folder/hello.js"
done