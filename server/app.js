/* las importaciones */
const express = require ('express')
const dotenv = require ('dotenv')
const cors = require ('cors')
const path = require ('path')
const cookieParser = require('cookie-parser'); 
const productRouter = require('./routers/productRouter')
const sessionRouter = require('./routers/sessionRouter')

/* configuraciones */
dotenv.config()
const mongoose = require('./config/dbConfig')
const app = express()
const PORT = process.env.PORT || 8080

/* middleweres */
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})) /* para habilitar consutlas de origen cruzado */
app.use(express.urlencoded({extended: true}))
app.use(express.json())/* para que se puedan leer los req.body */
app.use(cookieParser());
/* Routers */
app.use('/api/products', productRouter)
app.use('/api', sessionRouter)


app.listen(PORT, ()=>{
    console.log(`El servidor se esta escuchando en: http://localhost:${PORT}/`)
})