const userModel = require("../models/userModel")
const roleModel = require("../models/roleModel")
const emailUtils = require('../utils/emailUtil')
const appUtil = require('../utils/appUtil')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateAccessToken, authenticateToken } = require("../utils/authUtil");
// const { getNatsConnection } = require('../utils/natsUtil');
const { StringCodec } = require("nats");
dotenv.config();

const sc = StringCodec();
const subject = 'user.created';

const signUp = async (req, res) => {
    if(req.body.name === "" || req.body.email === "" || req.body.phone === "" || req.body.password === "" || req.body.isVerified === ""){
        //console.log("field validation");
        res.status(400).json({message: "Please enter name, email, phone, password, isVerified"})
        return;
    }

    const userA = await userModel.findOne({ email: req.body.email });
    if (userA != null) {
        return res.status(200).json({ message: 'Alreadt exist user' });
    }

    // try {
        role =  await roleModel.findById(req.body.role);
        // console.log("role ",role)
        if (role == null) {
            return res.status(404).json({ message: 'Cannot find role' });
        }
    // } catch (err) {
    //     return res.status(500).json({ message: err.message });
    // }

    // let otp = sendEmailOtp(req.body.email);
    // if(!otp){
    //     console.log("otp validation");
    //     res.status(400).json({message: "Otp not sent. Something went wrong. Please try again"})
    //     return;
    // }

    // console.log("next otp validation");
    // console.log(req.body)
    
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: role._id,
        isVerified: false,
        emailOtp: appUtil.generateOtp()
    });

    console.log(user)
    
    try {
        const newUser = await user.save();

        try {
            // Your user creation logic here
            console.log('New user created '+newUser)
        
            // // Assuming user creation is successful, publish message
            // const nc = getNatsConnection();
            // if (nc) {
            //     console.log('New user created '+newUser)
            //   nc.publish(subject, sc.encode('New user created '+newUser));
            // //   res.status(201).json({ message: 'User created successfully' });
            // } else {
            //   console.error('NATS connection is not initialized!');
            // //   res.status(500).json({ error: 'Internal server error' });
            // }
          } catch (error) {
            console.error(error);
            // res.status(500).json({ error: 'Internal server error' });
          }

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const login = async (req, res) => {
    if(req.body.email === "" || req.body.password === ""){
        res.status(400).json({message: "Please enter email, password"})
        return;
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).populate("role");

    if(!user){
        res.status(401).json({message: "Invalid Email"})
        return;
    }

    if(user.password !== password){
        res.status(401).json({message: "Wrong password provided"})
        return;
    }

    const token = generateAccessToken(user);

    res.status(200).json({user: user, token:token, expireTime: process.env.TOKEN_EXPIRE})
} 

const validateToken = async (req, res) => {
    if(req.body.token === ""){
        res.status(400).json({message: "Please send token to validate"})
        return;
    }
    authenticateToken(req.body.token, res)
}

const sendEmailOtp = (to) => {
    console.log("email is ", to)
    let otp = appUtil.generateOtp()
    let subject = "Otp for signup"
    let body = "Otp is "+ otp
    if(emailUtils.sendEmailOtp(subject, body, to)){
        return otp
    }else{
        return false
    }
}



module.exports = {signUp, login, validateToken}