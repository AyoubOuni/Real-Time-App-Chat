const express = require('express');
const app = express();
const routes = require('./routes/routes');
const Conversation = require('./routes/Conversation_router');
const Messages = require('./routes/Messages_router');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
     
      
      // apply them
      
      app.use(bodyParser.urlencoded({ extended: true }));
      
   
      const cors=require('cors');

   

      mongoose.connect('mongodb+srv://root:root@cluster0.lv4bqbh.mongodb.net/chat_app', { useNewUrlParser: true });
      app.options('*',cors());

      app.use(express.json());
      app.use(cors({
        origin:'http://localhost:3000'
      }));
const PORT = 4000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/', routes);
app.use('/conversation', Conversation);
app.use('/messages', Messages);
