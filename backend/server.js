const express = require('express');
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/taskDb')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))  