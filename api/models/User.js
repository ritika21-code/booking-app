const mongoose=require('mongoose');
const{Schema}=mongoose;
const Userschema=new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
  });
  
  const Usermodel = mongoose.model('User', Userschema);
  
  module.exports = Usermodel;