
const jwt = require ('jsonwebtoken')
const dotenv = require ('dotenv')

dotenv.config()

const SECRET_PASSWORD = process.env.SECRET_PASSWORD

const createAccesToken = (payload) =>{
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            SECRET_PASSWORD,
            {
                expiresIn: "1d",
            },
            (err, token)=>{
                if(err) reject(err)
                resolve(token)
                
            }   
        )
    })
    
}

module.exports = {createAccesToken}