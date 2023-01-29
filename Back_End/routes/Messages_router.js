const express = require('express');
const router = express.Router();
const Messages = require('../Messages/Messages');
        router.use(express.json());
//add
router.post('/',async(req,res) => {
const newMessage = new Messages(req.body);
try{
const savedMessage = await newMessage.save();
res.status(200).json(savedMessage);
console.log(newMessage)
}
catch(err){
    res.status(404).json(err);
}

})

//get conversation of a user

router.post('/getmessage',async(req,res) => {
   
    try{
    const allmessages = await Messages.find(
        {conversationId:req.body.conversation_id,}
    );
    
    res.status(200).json(allmessages);
    }
    catch(err){
        res.status(404).json(err);
    }
    
    })
    //delete conversation of a user

router.delete('/delete',async(req,res) => {
   
    try{

        

     await Messages.updateOne({ id: req.body.message_id} ,{text:"message deleted"});
    res.status(200);
    }
    catch(err){
        res.status(404).json(err);
    }
    
    })

module.exports = router;