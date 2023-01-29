const express = require('express');
const router = express.Router();
const Conversation = require('../Messages/Conversation');
        router.use(express.json());
//new conversation
router.post('/',async(req,res) => {
const newConversation = new Conversation({
members:[req.body.senderId,req.body.receiverId]
});
try{
const savedConversation = await newConversation.save();
res.status(200).json(savedConversation);
}
catch(err){
    res.status(404).json(err);
}

})

//get conversation of a user

router.post('/getconversation',async(req,res) => {
   
    try{
    const userConversation = await Conversation.find(
        {
            members:{
                $in:[req.body.userId]
            }
        }
    );
    
    res.status(200).json(userConversation);
    }
    catch(err){
        res.status(404).json(err);
    }
    
    })

module.exports = router;