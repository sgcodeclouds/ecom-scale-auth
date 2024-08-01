const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type:String, 
    required:true
  },
  email:{
    type:String, 
    required:true
  },
  phone: {
    type:String, 
    required:true
  },
  password: {
    type:String, 
    required:true
  },
  role:{
    type:Schema.Types.ObjectId, 
    ref:'Role',
    required:true
  },
  isVerified: {
      type: Boolean,
      default: false
  },
  emailOtp: Number,
  status: {
      type: Number,
      enum : [0,1],
      default: 1
  },
});

module.exports = mongoose.model('User', userSchema);