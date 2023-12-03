// middleware.js
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv')
dotenv.config()
SECRET_PASSWORD = process.env.SECRET_PASSWORD

const authenticateToken=(req, res, next)=> {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    jwt.verify(token, SECRET_PASSWORD, (err, user) => {
        if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
});
}

module.exports = { authenticateToken };
