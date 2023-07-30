const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "DIARYAPI";


const register = async(req, res) =>{

const { username, email, password} = req.body;
try {
    const emailRegex = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailRegex.test(email)){
        return res.status(409).json({error : "Invalid email format"})
    }


    const existingemail = await userModel.findOne({email : email});

    if(existingemail){
        return res.status(400).json({message : "Email already exists"});
    }
    const existinguser = await userModel.findOne({username : username});

    if(existinguser){
        return res.status(400).json({message : "User already exists"});
    }

    
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
        email : email,
        password: hashedPassword,
        username : username
    });

    const token = jwt.sign({email : result.email, id : result._id},SECRET_KEY);
    res.status(201).json({user : result, token : token});

    res.json({message :"User registered successfully"});

} catch (error) {
    console.log(error);
    res.status(500).json({message : "Something went wrong!"});

}

}

const login = async(req, res) => {

    const {email, password} = req.body;
    try {

        const existingemail = await userModel.findOne({email : email});

    if(!existingemail){
        return res.status(400).json({message : "User not found"});
    }

    const matchPassword = await bcrypt.compare(password, existingemail.password);
    if(!matchPassword){
        return res.status(400).json({message : "Invalid Credentials"});
    }

    const token = jwt.sign({email : existingemail.email, id : existingemail._id},SECRET_KEY);
    res.status(201).json({user : existingemail, token : token});
        
    } catch (error) {
        console.log(error);
    res.status(500).json({message : "Something went wrong!"});
    }

}

module.exports = {register, login};