const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
nom:{
    type:String,
    required:true,
},
prenom:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},

tel:{
    type:String,
    required:true,
},
username:{
    type:String,
    required:true,
},
sexe:{
    type:String,
    required:true,
},
photo:{
    type:String,
    required:true,
},
date_creation:{
    type:String,
    required:true,
},
path:{
    type:String,
    required:true,
},

});
const User=mongoose.model('user',userSchema);
module.exports = User;