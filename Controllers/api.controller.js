const root = require('../GraphQL/resolver.Graphql');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

exports.postLogin = async (req, res) => {
    try {
        const userData = await root.getUserByPara({email: req.body.email});
        if(!userData){throw new Error("No User found!..");}else{
            if(await bcrypt.compare(req.body.password, userData.password)){
                return res.cookie("access_token", jwt.sign({id: userData}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})).status(200).json({message:"Logged in successfully 😊 👌"})   
                
            }else{throw new Error("Invalid Password");}
        }
    } catch (e) {return res.status(401).json({message:e.message})}
}

exports.postRegister = async (req, res) => {
    try {
        if (req.body.password == req.body.confirmPassword) {
            const userData = await root.getUserByPara({email: req.body.email});
            if(!userData){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const created = await root.createUser({firstName: req.body.firstName,lastName: req.body.lastName,email: req.body.email,password: hashedPassword});
                const userDetail = await root.getUserByPara({email: req.body.email});
                if (created) {
                    return res.status(200).json({message:"Registered successfully 😊 👌\nYou are Welcome "+userDetail.firstName+" "+userDetail.lastName})
                }
            }else{throw new Error("You are existing Users "+userData.email);}
        }else{throw new Error("Your Passwords are not Match");}
    } catch (e) {return res.status(401).json({message:e.message})}
}

