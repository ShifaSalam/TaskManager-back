const jwt=require('jsonwebtoken')

const jwtMiddlewareFun=(req,res,next)=>{
    console.log("middleware")
    try{
        const token=req.headers.authorization.split(" ")[1]
        // console.log(req)
        if(token){
            const result=jwt.verify(token,process.env.SECRET_KEY)
            req.payload=result.userId
            next()
        }
        else{
            res.status(406).json("Please Login First!!")
        }
    }
    catch(err){
        console.log(err+"First")
        res.status(406).json("Please Login")
    }
}

module.exports=jwtMiddlewareFun