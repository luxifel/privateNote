# Scalanote
Scalanote is a webapp for creating temporary notes that will be destroyed after read

## Development environment setup

### 1) Pre-requisite
Install the following on your local machine

 1. Mongo Db
 2. NodeJS (v12.20.0)
 3. Visual Code

### 2) Create an .env file

    copy an .env file in the root directory and fill with the right variables

    ```
    mv env.development .env
    ```


## Code structure

The code base

### api
Container of the logic

### models
Models of the note for Mongo DB

### controllers
Controllers are responsible for managing request and response.

### routes
Routes are responsible for orchestrating the requests comming into the server.

### herlpers
Helper reusable functions

### views
Container of all the handlebars files for dynamic html 
