// user schema creation
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{type:String,required: true },
  surname:{type:String,required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image:{type:String,default:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frcmi.fiu.edu%2Fwp-content%2Fuploads%2Fsites%2F30%2F2018%2F02%2Fno_user.png&f=1&nofb=1&ipt=7a788d057a3264a2a192cccb19ef6a15a8251fa8fad5d6706b4a7902486f6f67&ipo=images"},
});

module.exports = mongoose.model('User', userSchema);