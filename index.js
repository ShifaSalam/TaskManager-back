require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./Connection/db')
const router=require('./Routes/router')

const taskServer=express()
taskServer.use(cors())
taskServer.use(express.json())
taskServer.use(router)


const PORT=3001 || process.env.PORT

taskServer.listen(PORT,()=>{
    console.log(`Task Manager Server is running at:${PORT}`)
})

taskServer.get('/',(req,res)=>{
    res.send("<h1> Task Server is Active!!</h1>")
})