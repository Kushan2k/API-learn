const express=require('express')
const path=require('path')
require('dotenv').config()

//importing routes
const IndexRoutes = require('./Routes/HomeRoute.js')
const LoginRoutes=require('./Routes/LoginRoutes.js')

const bodyParser = require('body-parser')
const mongooes = require('mongoose')



const app = express()

//variables

const publicdir = path.join(__dirname, 'public')

const PORT = process.env.PORT || 8090

mongooes.connect('mongodb://127.0.0.1:27017/apidata').then(conn => {
  // console.log(conn)
}).catch(error => {
  // console.log(error)
})

//app configs
app.set('view engin', 'ejs')

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(publicdir))


//routes
app.use('/', IndexRoutes)
app.use('/',LoginRoutes)










app.listen(PORT, () => {
  
})
