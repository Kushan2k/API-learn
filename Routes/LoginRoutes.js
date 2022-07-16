const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const Route = express.Router()

const UserModel = require('../Models/User.js')
const bCrypt = require('bcrypt')

const jwt=require('jsonwebtoken')



Route.get('/login', (req, res) => {
  
  
  res.render('login.ejs', { title: "Login-API"})
  

}).post('/login', (req, res) => {
  res.send("login posted")
})


Route.get("/register", (req, res) => {

  res.render('register.ejs', { title: 'Register-API' })
  

}).post('/register',(req, res) => {

  const { name, email, password, age } = req.body

  
  if (password?.length < 8 || name?.length == 0 || email?.indexOf('@') < 0) {
    
    res.status(302).redirect('/register')

  }

  const user = new UserModel({
    name: name,
    email: email,
    age:age
  })
  
  bCrypt.genSalt(10, function(err, salt) {
    bCrypt.hash(password, salt, function(err, hash) {
        
      if (err) {
        res.status(403)
      } else {
        user.password = hash
      }
    });
  });
  
  try {
    user.save()
  } catch (er) {
    res.status(500)
  }

  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email:user.email
  },process.env.SECRET_KEY)

  res.token = token
  res.cookie('logedin', true)
  res.redirect('/')

  




  
})






module.exports=Route