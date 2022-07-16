const express=require('express')

const Route = express.Router()


Route.get('/',checkLoggedIN ,function (req, res) {
  
  
  if (req.login) {
    res.render('index.ejs',{logedIn:true})
  } else {
    res.render('index.ejs',{logedIN:false})
  }
  
  
})

function checkLoggedIN(req, res, next) {
  
  console.log(req.cookies)
  if (req.cookies.logedin) {
    req.login = true
    next()
  } else {
    req.login = false
    next()
  }
}


module.exports=Route