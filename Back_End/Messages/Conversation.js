const mongoose=require('mongoose');
const ConversationSchema=mongoose.Schema({
   members: {
    type: Array ,
   }

});
const conversation=mongoose.model('conversation',ConversationSchema);
module.exports = conversation;