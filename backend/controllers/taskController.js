const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')

// Retrieve all tasks
// GET /api/tasks
// Private
const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })
  res.status(200).json(tasks)
})

// Create one task at a time
// POST /api/tasks
// Private
const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
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

  if (task.use.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not authorised to update task')
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true } // returns the updated version
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
  getTask, setTask, updateTask, deleteTask
}

