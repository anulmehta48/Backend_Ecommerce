const userModel = require("../models/user.model");
const bcrypt=require('bcrypt')
 
/**
 * logic to create a user
 * 
 * 1. Read the request body
 * 
 * 2. Insert the data in the user collection in mongoDB
 * 
 * 3. Return the response back to the user
 * 
 */
exports.signup=async (req,res)=>{
    try {
        const request_body=req.body
        if(Object.keys(request_body).length===0){
            return res.status(400).send({message:"Please provide valid details"})
        }
        const userObj={
            name:request_body.name,
            userId:request_body.userId,
            email:request_body.email,
            userType:request_body.userType,
            password:bcrypt.hashSync(request_body.password,10)
        }
        const user_created=await userModel.create(userObj)
        const res_obj={
            name:user_created.name,
            email:user_created.email,
            userType:user_created.userType,
            userId:user_created.userId
        }
        res.status(201).send(res_obj)
    } catch (error) {
        console.log("External Server Error ",error)
        res.status(500).send({message:"Some error happended while registring the user"})
    }
}


