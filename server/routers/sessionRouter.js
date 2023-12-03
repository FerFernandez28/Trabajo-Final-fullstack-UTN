const express = require('express')
const { creatUser, verifyExistUser} = require('../dao/controllers/userController')
const User = require('../dao/models/userModel')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')
const { createAccesToken } = require('../libs/jwt')
const { authenticateToken } = require('../middleware/validateToken')
const { validateSchema } = require('../middleware/validator.middleware')
const sessionRouter = express.Router()
const {registerSchema, loginSchema} = require('../schemas/auth.schema')

const dotenv = require ('dotenv')
dotenv.config()
SECRET_PASSWORD = process.env.SECRET_PASSWORD

sessionRouter.post('/register', validateSchema(registerSchema),async(req, res)=>{
    const {username, email, password} = req.body
    try {
        const usuarioExistente = await verifyExistUser({email})
        if(usuarioExistente){
            return res.status(400).json(["the email is already in use"])
        }else{
            const newUser = await creatUser({username, email, password})
            const token = await createAccesToken({id: newUser._id})         
            res.cookie('token', token)
            res.json({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createAt: newUser.createdAt,
                updateAt: newUser.updatedAt,
            })
    }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
    }
    
)

sessionRouter.post('/login', validateSchema(loginSchema),async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email: email });
        if (!userFound) {
            return res.status(400).json({message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect password"})
        }
        const token = await createAccesToken({id: userFound._id})         
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
});

sessionRouter.post("/logout", (req, res)=>{
    res.cookie('token', "", {
        expires: new Date(0),
    })
    return res.sendStatus(200)
})

sessionRouter.get("/verify", async(req, res)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    jwt.verify(token, SECRET_PASSWORD, async(err, user) =>{
        if(err){
            return res.status(401).json({ message: "Unauthorized"})
        }
        const userFound = await User.findById(user.id)
        if(!userFound){
            return res.status(401).json({ message: "Unauthorized"})
        }
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
})

sessionRouter.get("/profile", authenticateToken, async(req, res)=>{
    const userFound = await User.findById(req.user.id)
    if(!userFound){
        return res.status(400).json({message: "User not found"})
    }
    return res.json({      
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    })
})

module.exports = sessionRouter