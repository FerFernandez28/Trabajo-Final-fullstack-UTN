const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken');
const { createAccesToken } = require("../../libs/jwt");

const creatUser = async(user) =>{
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        const newUser = new User(user)
        return await newUser.save()
    } catch (err) {
        console.error(err) 
    }
    
}

const getUser = async()=>{

}
/* verifica si el usuario ya existe */
const verifyExistUser = async(user) =>{
    try {
        const existingUser = await User.findOne(user);
        return existingUser;
    } catch (err) {
        console.error(err)
    }
}


module.exports = {getUser, verifyExistUser, creatUser}