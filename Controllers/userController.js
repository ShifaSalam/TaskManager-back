const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')


exports.userRegister=async(req,res)=>{
    const {username,password,email}=req.body
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(401).json("User Already Exists!")
            console.log(existingUser)
        }
        else{
            const newUser=new users({
                username,password,email
            })
            await newUser.save()
            res.status(201).json(newUser)
            console.log(newUser)
        }
    }catch(err){
        res.status(404).json(err)
    }
}

exports.userLogin=async(req,res)=>{
    try{
        const{email,password}=req.body
        const existingUser= await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
            res.status(200).json({existingUser,token})
        }
        else{
                res.status(401).json("Invalid Email/Password")
        }
    }
    catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}