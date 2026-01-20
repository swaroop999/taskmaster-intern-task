# TaskMaster API Reference

**Base URL:** `https://taskmaster-intern-task.vercel.app/api`

## 1. Authentication

### Register User

Creates a new account and logs the user in.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "name": "My Name",
    "email": "myemail@gmail.com",
    "password": "mypassword123"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** Returns user details + JWT Token.

### Login

Logs in an existing user.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "email": "myemail@gmail.com",
    "password": "mypassword123"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Returns user details + JWT Token.

---

## 2. Tasks

**Note:** All task endpoints require the Header: `x-auth-token: <your_token_here>`

### Get All Tasks

Fetches all tasks belonging to the logged-in user.

- **URL:** `/tasks`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of task objects.

### Create Task

Adds a new task to the list.

- **URL:** `/tasks`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "title": "Buy groceries"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** The created task object.

### Update Task (Toggle/Edit)

Updates task status (completed/pending) or title.

- **URL:** `/tasks/:id` (Replace `:id` with actual Task ID)
- **Method:** `PUT`
- **Body (JSON):**
  ```json
  {
    "isCompleted": true
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** The updated task object.

### Delete Task

Permanently removes a task.

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "msg": "Task removed" }`
