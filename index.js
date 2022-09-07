const express=require('express')
const path=require('path')
require('dotenv').config()

//importing routes
const IndexRoutes = require('./Routes/HomeRoute.js')
const LoginRoutes=require('./Routes/LoginRoutes.js')

const bodyParser = require('body-parser')
const mongooes = require('mongoose')
const cookieParser=require('cookie-parser')



const app = express()

//variables

const publicdir = path.join(__dirname, 'public')

const PORT = process.env.PORT || 8090

mongooes.connect('mongodb://127.0.0.1:27017/apidata').then(conn => {
  // console.log(conn)
  if (conn == null) {
    console.log("Null connection")
  } else {
    console.log("Connected")
  }
}).catch(error => {
  // console.log(error)
})

//app configs
app.set('view engin', 'ejs')

//middlewares
app.use(express.static(publicdir))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(cookieParser())



//routes
app.use('/', IndexRoutes)
app.use('/account',LoginRoutes)












app.listen(PORT, () => {
  
})
