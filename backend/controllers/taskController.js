const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
//const User = require('../models/userModel')

// Retrieve all tasks
// GET /api/tasks
// Private
const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })
  res.status(200).json(tasks)
})

// Retrieve single task
// Get api/tasks/:id
// Private
const getSingleTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized to view this task')
  }

  res.status(200).json(task)
})

// Create one task at a time
// POST /api/tasks
// Private
const setTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body

  if (!title || !description || !dueDate) {
    res.status(400)
    throw new Error('Please add a title, description, and due date')
  }
  const task = await Task.create({
    user: req.user.id,
    title, description,
    status: status || 'todo',
    dueDate,
  })
  res.status(201).json(task) // 201 = Created
})

// Update a task
// PUT /api/tasks/:id
// Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not authorised to update task')
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title || task.title,
      description: req.body.description || task.description,
      status: req.body.status || task.status,
      dueDate: req.body.dueDate || task.dueDate,
     },
    { new: 'after', runValidators: true } // returns the updated version
  )

  res.status(200).json(updatedTask)
})

// Delete a task
// DELETE /api/tasks/:id
// Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorised to delete this task')
  }

  await task.deleteOne()
  res.status(200).json({ id: req.params.id, message: 'Task deleted' })
})

module.exports = {
  getTask, getSingleTask, setTask, updateTask, deleteTask
}

