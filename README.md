# Task Management REST API

A RESTful backend API for managing tasks, built with Node.js, Express, and MongoDB. API supports user authentication via JWT and full CRUD operations on tasks.

---

## Tech Stack

- **Node.js** — runtime environment
- **Express.js** — web framework
- **MongoDB** — database
- **Mongoose** — ODM for MongoDB
- **JWT** — authentication
- **bcryptjs** — password hashing

---

## Project Structure

```
task-api/
├── backend/
│   ├── config/
│   │   └── taskDb.js               
│   ├── controllers/
│   │   ├── taskController.js   
│   │   └── userController.js   
│   ├── middleware/
│   │   ├── authMiddleware.js   
│   │   └── errorMiddleware.js  
│   ├── models/
│   │   ├── taskModel.js        
│   │   └── userModel.js        
│   ├── routes/
│   │   ├── taskRoutes.js      
│   │   └── userRoutes.js      
│   └── server.js               
├── .env
├── .gitignore
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account

### Installation

1. Clone the repository

```bash
git clone https://github.com/tuse-ngumimi/task-manager-api.git
cd task-manager-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server

```bash
npm run server
```

The server will start on `http://localhost:5000`

---

## Environment Variables

| Variable     | Description                               |
|--------------|-------------------------------------------|
| `NODE_ENV`   | Environment (`development`/`production`)  |
| `PORT`       | Port the server runs on                   |
| `MONGO_URI`  | MongoDB Atlas connection string           |
| `JWT_SECRET` | Secret key used to sign JWT tokens        |

---

## API Endpoints

### Auth Routes

| Method | Endpoint              | Description            | Access  |
|--------|-----------------------|------------------------|---------|
| POST   | `/api/users/register` | Register a new user    | Public  |
| POST   | `/api/users/login`    | Login existing user    | Public  |
| GET    | `/api/users/me`       | Get logged-in user     | Private |

### Task Routes

All task routes require a valid JWT in the `Authorization` header as a Bearer token.

| Method | Endpoint           | Description              | Access  |
|--------|--------------------|--------------------------|---------|
| GET    | `/api/tasks`       | Get all tasks for user   | Private |
| POST   | `/api/tasks`       | Create a task            | Private |
| GET    | `/api/tasks/:id`   | Get a single task        | Private |
| PUT    | `/api/tasks/:id`   | Update a task            | Private |
| DELETE | `/api/tasks/:id`   | Delete a task            | Private |

---

## Data Models

### User

| Field       | Type     | Required     |
|-------------|----------|--------------|
| `name`      | String   | Yes          |
| `email`     | String   | Yes          |
| `password`  | String   | Yes (hashed) |
| `createdAt` | Date     | Auto         |
| `updatedAt` | Date     | Auto         |

### Task

| Field         | Type     | Required | Notes                                           |
|---------------|----------|----------|-------------------------------------------------|
| `user`        | ObjectId | Yes      | Reference to the owning user                    |
| `title`       | String   | Yes      |                                                 |
| `description` | String   | Yes      |                                                 |
| `status`      | String   | No       | `todo` / `in-progress` / `done`. Defaults to `todo` |
| `dueDate`     | Date     | Yes      |                                                 |
| `createdAt`   | Date     | Auto     |                                                 |
| `updatedAt`   | Date     | Auto     |                                                 |

---

## Example Requests

### Register

```json
POST /api/users/register
{
  "name": "Mimi",
  "email": "mimi@example.com",
  "password": "yourpassword"
}
```

### Login

```json
POST /api/users/login
{
  "email": "mimi@example.com",
  "password": "yourpassword"
}
```

### Create a Task

Add `Authorization: Bearer <token>` to the request header.

```json
POST /api/tasks
{
  "title": "Clean room",
  "description": "Tidy up and vacuum the bedroom",
  "status": "todo",
  "dueDate": "2026-04-10"
}
```

### Update a Task

```json
PUT /api/tasks/<id>
{
  "status": "in-progress"
}
```

---

## Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

Tokens are returned on successful registration or login and expire after 30 days.

---

## Scripts

| Command          | Description                         |
|------------------|-------------------------------------|
| `npm run server` | Start development server (nodemon)  |
| `npm start`      | Start production server             |

---

## Author

**Ngumimi Bethel Tuse**
[GitHub](https://github.com/tuse-ngumimi) · [Instagram](https://instagram.com/bethel.builds)
