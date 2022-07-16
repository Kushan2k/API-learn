const mongoose=require('mongoose')

const User = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  token: String
  
})


module.exports= mongoose.model('User',User)