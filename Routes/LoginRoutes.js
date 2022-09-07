const express = require('express')
require('dotenv').config()

const Route = express.Router()

const UserModel = require('../Models/User.js')
const bCrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



Route.get('/login', (req, res) => {
  
  console.log(req.token)
  res.render('login.ejs', { title: "Login-API",login:false})
  

}).post('/login', async (req, res) => {

  let data = req.body
  
  const { email, password } = data
  
  let user =await UserModel.findOne({ email: email })
  
  if (bCrypt.compare(password, user.password)) {
    res.cookie('token', user.token)
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
  


})

Route.get("/register", (req, res) => {

  
  res.render('register.ejs', { title: 'Register-API',login:false})
  

  
  

}).post('/register',(req, res) => {

  let data=req.body

  const { name, email, password, age } = data;

  if (!verify(email, name, age)) {

    res.redirect('account/register')
  }else {
    
    if (checkuser(email)) {
      
      let user = new UserModel({
        email: email,
        age: age,
        name:name
      })

      const salt = bCrypt.genSaltSync(10)
      const hash = bCrypt.hashSync(password, salt)
      
      user.password=hash

      const token=jwt.sign({
        name: user.name,
        id: user._id,
        email:user.email
      }, process.env.SECRET_KEY)
      
      user.token = token
      
      try {
        user.save()
        res.cookie('token',user.token)
        res.redirect('/')
      } catch (error) {
        res.redirect('register')
      }

    }else {
      res.redirect('/register')
    }
    
  }


  
})

function verify(email, name, age) {
  
  if (email.length == 0 || name.length == 0 || (0 > age && 100 < age)) {
    return false
  } else {
    return true
  }
}

function  checkuser(email) {
  
  const found = UserModel.findOne({ email: { $eq: email } }, (er, doc) => {
    if (er) {
      return false
    }
    
    if (doc == null) {
      return true
    } else {
      return false
    }
  })

  if (found) {
    console.log(found)
    return true
  } else {
    return false
  }
  
  
}


module.exports=Route