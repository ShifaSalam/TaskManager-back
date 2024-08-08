
const tasks = require('../Models/taskModel')


// Create New Task
exports.addTask = async (req, res) => {
    // destructuring
    const { taskTitle, description, important, isCompleted, date } = req.body
    const userId = req.payload

    try {
        const existingTask = await tasks.findOne({ taskTitle })
        if (existingTask) {
            res.status(406).json("Task already Added!")
        }
        else {
            // if not existing task, create another object
            const newTask = new tasks({
                taskTitle, description, important, isCompleted, date: new Date(date), userId
            })
            await newTask.save()
            res.status(200).json(newTask)
            console.log(userId)
        }
    }
    catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
}

// Get All Tasks for a specific user
exports.allTasks = async (req, res) => {

    try {
        const userId = req.payload
        const result = await tasks.find({ userId })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Tasks Available !")
        }
    } catch (err) {
        res.status(400).json(err)
    }

}

// Specific Task Details
exports.taskDetail = async (req, res) => {

    const { tid } = req.params
    const userId = req.payload

    try {
        const result = await tasks.findById({ _id: tid })
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(401).json("No Task Available !")
        }
    }
    catch (err) {
        console.log(err)
        res.status(406).json(err)
    }
}

// to Update Tasks
exports.editTask = async (req, res) => {
    const { taskTitle, description, important, isCompleted, date } = req.body
    const userId = req.payload
    const { tid } = req.params
    try {
        const updateTask = await tasks.findByIdAndUpdate({ _id: tid },
            { taskTitle, description, important, isCompleted, date, userId }, { new: true })
        await updateTask.save
        res.status(200).json(updateTask)
    }
    catch (err) {
        console.log(err)
        res.status(406).json(err)
    }
}

// to delete a task
exports.removeTask = async (req, res) => {
    const { tid } = req.params
    try {
        const result = await tasks.findByIdAndDelete({ _id: tid })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

// to update the task completion
exports.completeTask = async (req, res) => {
    const { id } = req.params
    const { isCompleted } = req.body
    try {
        const task = await tasks.findByIdAndUpdate(id, { isCompleted }, { new: true })
        if (!task) {
            res.status(404).json('Task not found');
        }
        else{
            res.status(200).json(task);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}

// to get all the completed tasks
exports.getCompletedTask = async (req, res) => {

    try {
        const userId = req.payload
        const completedTasks = await tasks.find({ userId: userId, isCompleted: true });
        res.json(completedTasks);
    } catch (err) {
        res.status(500).json(err);
    }

}