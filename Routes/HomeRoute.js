const express=require('express')

const Route = express.Router()


Route.get('/',function (req, res) {
  
  if (!req.cookies['token']) {
    res.render('index.ejs',{login:false})
  } else {
    res.render('index.ejs', {
      login:true
    })
  } 

  
  
  
})




module.exports=Route