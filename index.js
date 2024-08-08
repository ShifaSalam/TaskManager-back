require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./Connection/db')
const router=require('./Routes/router')

// creating server instance
const taskServer=express()

// configuring cors into server
taskServer.use(cors())

// configuring json conversion on server
taskServer.use(express.json())

// configuring routes to server
taskServer.use(router)

// Port
const PORT=3001 || process.env.PORT

// calling listen method to implement listen mode for server to run
taskServer.listen(PORT,()=>{
    console.log(`Task Manager Server is running at:${PORT}`)
})

// setting response for base_url get request
taskServer.get('/',(req,res)=>{
    res.send("<h1> Task Server is Active!!</h1>")
})