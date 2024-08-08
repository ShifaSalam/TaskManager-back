const mongoose = require('mongoose')

// create task model
const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
        unique:true
    },
    important: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

// define model
const tasks = mongoose.model('tasks', taskSchema)

module.exports = tasks