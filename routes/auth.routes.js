const express=require('express');
const router=express.Router()
const { signup } = require('../controllers/user.controller');

router.get("/test",(req,res)=>{
    res.status(200).send("Express is Running")
})
router.post("/ecomm/api/v1/auth/signup",signup)


module.exports=router;
