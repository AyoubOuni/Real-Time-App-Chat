const mongoose=require('mongoose');
const MessagesSchema=mongoose.Schema({
   conversationId: {
    type: String ,
   },
   sender: {
    type: String ,
   },
   text: {
    type: String ,
   }, 
   id: {
      type: String ,
     },

},
{timestamps:true}

);
const Messages=mongoose.model('Messages',MessagesSchema);
module.exports = Messages;