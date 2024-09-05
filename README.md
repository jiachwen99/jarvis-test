# Task Management API

This is a Task Management API built with Node.js, Express, Prisma, and Redis.

# Author
Name: JC Tan
Email: jiachwen99@gmail.com
Time Start: 11:00 AM
Time End: 1:30 PM

## Prerequisites
- Node.js
- yarn
- Docker
- MySQL
- Redis

## Setup
1. Clone the repository
2. `yarn` to install dependencies:
3. `yarn prisma:generate` to generate the prisma client
4. `yarn prisma:migrate:dev` to run the migrations
5.  Copy the `.env.example` file to `.env` and fill in the required values.
6. `yarn dev` to start the application

## Setup Docker
1. Install Docker
2. Run `yarn docker:compose` to start the containers

## Running Tests
Run `yarn test` to run the tests

## API

### Tasks

#### Create a Task
- **POST** `/api/tasks`
- Creates a new task
- Request Body:
  ```json
  {
    "title": "string",
    "description": "string",
  }
  ```

#### Get All Tasks
- **GET** `/api/tasks`
- Retrieves all tasks

#### Get a Task
- **GET** `/api/tasks/:id`
- Retrieves a specific task by ID

#### Update a Task
- **PUT** `/api/tasks/:id`
- Updates an existing task
- Request Body:
  ```json
  {
    "title": "string",
    "description": "string",
  }
  ```

#### Delete a Task
- **DELETE** `/api/tasks/:id`
- Deletes a specific task by ID

#### Create a Comment
- **POST** `/api/tasks/:id/comments`
- Creates a new comment
- Request Body:
  ```json
  {
    "content": "string"
  }
  ```
