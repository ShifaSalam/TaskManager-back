const express=require('express')
const userController=require('../Controllers/userController')
const taskController=require('../Controllers/taskController')

const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const router=new express.Router()

// AUTHENTICATION
router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)

// TASK OPERATIONS
router.post('/add',jwtMiddleware,taskController.addTask)
router.get('/allTasks',jwtMiddleware,taskController.allTasks)
router.get('/oneTask/:tid',jwtMiddleware,taskController.taskDetail)
router.put('/editTask/:tid',jwtMiddleware,taskController.editTask)
router.delete('/deleteTask/:tid',jwtMiddleware,taskController.removeTask)
router.put('/completeTask/:id',jwtMiddleware,taskController.completeTask)
router.get('/completedTasks',jwtMiddleware,taskController.getCompletedTask)

module.exports=router
