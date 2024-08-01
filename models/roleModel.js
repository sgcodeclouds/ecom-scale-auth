const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: {
    type:String, 
    required:true
  },
  permissions:{
    type:Object,
    default:{
      user:{
        create: false,
        read: false,
        update: false,
        delete: false,
      },
      category:{
        create: false,
        read: false,
        update: false,
        delete: false,
      },
      product:{
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    }
  },
  status: {
      type: Number,
      enum : [0,1],
      default: 1
  }
});

module.exports = mongoose.model('Role', roleSchema);