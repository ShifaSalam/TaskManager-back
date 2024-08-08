const mongoose=require('mongoose')
const connectionString=process.env.DATA_BASE

mongoose.connect(connectionString).then(res=>{
    console.log("Server is connected with MongoDB Atlas")
}).catch(err=>{
    console.log(err)
})