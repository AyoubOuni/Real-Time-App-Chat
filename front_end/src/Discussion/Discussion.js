import React, {useState, useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav_user from './../Nav_user/Nav_user'
import './Discussion.css'
import {io} from "socket.io-client"
import{format} from 'timeago.js'
import{IoSearchSharp} from 'react-icons/io5'
import{VscCircleFilled} from 'react-icons/vsc'
import{FiMoreHorizontal} from 'react-icons/fi'
import { useParams } from 'react-router-dom';
import song from "./son.mp3";
import ReactAudioPlayer from 'react-audio-player';
import InputEmoji from 'react-input-emoji'


function Discussion() {
    let { current_username } = useParams();
    var socket=io("ws://localhost:8900");


  //declaration
  const scrollRef=useRef();
  // const socket=useRef();
  let history = useNavigate();
  var [User, setuser] = useState([]);
  var [currentconversation, setcurrentconversation] = useState(null);
  var [messages, setmessages] = useState([]);
  var [picture, setpicture] = useState([]);
  var [newmessage, setnewmessage] = useState("");
  var [myuser, setmyuser] = useState("");
  var [userna, setuserna] = useState("");
  var [arrivalmessage, setarrivalmessage] = useState([]);
  var [connected, setconnected] = useState([]);
  var [discuser,setdiscuser] = useState([]);
  var [send, setsend] = useState(null);
  const [conversation,setconversation]=useState([]);
  var conv=[];
  var msg="";
  var id=getCookie('user_id');
  var chat_id;


//fonction get cookie
  function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
//fonction get user by id
const get=async() =>{
await   fetch('http://localhost:4000/userbyid', {
       method: 'POST',
       body: JSON.stringify({
           id:id,
        }),
        headers: {
          "Content-Type":"application/json"
        },
        
      
    })
   .  then(function(response){
       return response.json();
     })
     .then(function(myJson) {
      // console.log(myJson[0]);
       setuser(myJson[0]);
     });


}

//fonction get all users
const get2=async() =>{
await   fetch('http://localhost:4000/userbyusername', {
  method: 'POST',
  body: JSON.stringify({
      username:current_username,
   }),
   headers: {
     "Content-Type":"application/json"
   },
   
        
      
    })
   .  then(function(response){
       return response.json();
     })
     .then(function(myJson) {
      obj=myJson;
      console.log(myuser);
       setmyuser(myJson);
       username2=myJson[0].nom+' '+myJson[0].prenom;
       console.log(username2);
       setuserna(username2);

     });


}
//function get conversation of this user
const getconversation=async() => {

await   fetch(`http://localhost:4000/conversation/getconversation`, {
       method: 'POST',
       body:JSON.stringify({
        userId:id
       }),
        headers: {
          "Content-Type":"application/json"
        },
        
      
    })
   .  then(function(response){
       return response.json();
     })
     .then(function(myJson) {
       console.log(myJson);
      setconversation(myJson);
      conv=myJson;
     });
}
//function to show users conversation
// const check=()=>{
// conversation.map((elements,index)=>{
//     if(elements.members[0]===User.id){
// users.map((el,indexx)=>{
// if(elements.members[1]===el.id){
// conv.push(el);
// }
// })
//         }
//         else if (elements.members[1]===User.id){

//             users.map((el,indexx)=>{
//                 if(elements.members[0]===el.id){
//                     conv.push(el);
//                 }
                
                
//                     })
//                                 }
      
//         });

//     }
//function to show discussion betwwen 2 users
var obj={};
var [newconv, setnewconv] = useState(false);

const show=async()=>{
var ex=false;

console.log(conv);
conv.map(async(elements,index)=>{
            if(elements.members[0]===obj[0].id){
                chat_id=elements._id;
                setcurrentconversation(elements._id);
               ex=true;
}else if (elements.members[1]===obj[0].id){
  ex=true;

    chat_id=elements._id;
    setcurrentconversation(elements._id);

}
});





if(!ex){


  await   fetch(`http://localhost:4000/conversation`, {
    method: 'POST',
    body: JSON.stringify({
      senderId:id,
      receiverId:obj[0].id,
   }),
     headers: {
       "Content-Type":"application/json"
     },
 }) .  then(function(response){
  return response.json();
})
.then(function(myJson) {
  console.log(myJson);
  setcurrentconversation(myJson._id);
  chat_id=myJson._id;
     setnewconv(true);

});
}
    await   fetch(`http://localhost:4000/messages/getmessage`, {
        method: 'POST',
        body: JSON.stringify({
          conversation_id:chat_id
        }),
         headers: {
           "Content-Type":"application/json"
         },
         
       
     })
    .  then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        msg=myJson;
        setmessages(myJson);
      });

      setpicture(obj[0].path);


    }

//function delete message
const delete_message=async(message_id)=>{
messages.map((element,index)=>{
  if(element.id===message_id){
    messages[index].text="message deleted";
        getconversation();

}});

socket.emit("deleteMessage",{
  conversationId:currentconversation,
  userId:id,
  receiverId:myuser[0].id,
  messageid:message_id.toString(),
})

await fetch('http://localhost:4000/messages/delete', {
method: 'DELETE',
body: JSON.stringify({
  message_id:message_id,
 }),
 headers: {
   "Content-Type":"application/json"
 },
 

});



}
//function show_profile
const show_profile=async()=>{

      history(`/profil/${current_username}`);




}

//function send message
const sendmessage=async()=>{
  
  var id_token= Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000);

setsend(newmessage);
setmessages([...messages,{
    conversationId:currentconversation,
    sender:id,
    text:newmessage, 
    id:id_token,



  }])
  socket.emit("sendMessage",{
    conversationId:currentconversation,
    userId:id,
    receiverId:myuser[0].id,
    text:newmessage,
})

    await fetch('http://localhost:4000/messages', {
         method: 'POST',
         body: JSON.stringify({
            conversationId:currentconversation,
            sender:id,
            text:newmessage, 
            id:id_token,



          }),
          headers: {
            "Content-Type":"application/json"
          },
          
        
      }).then(()=>{      setnewmessage('');
    })
  }
   

//
var username2;

const hhhj=async()=>{
  
 console.log('holl');
 await get();
 await get2();
 console.log(obj[0].id);
 console.log(obj[0]);
 console.log('before');

 await getconversation();
 console.log('after');
 await show();

 console.log('afterafter');
 console.log(messages);
}

useEffect(()=>{
  hhhj();
  redirect();
  


},[]);

useEffect(()=>{
  socket.emit("adduser",id);
  socket.on("getusers",users=>{
    console.log(users);
    setconnected(users);
  });
  socket.on("getMessage",async(data) =>{
    console.log(data);
    var s=document.getElementById('song');
      s.play();
      getmessaged(data.conversationId);
    
    
      // setarrivalmessage({
      //      sender:data.userId,
      //      text:data.text,
      //      createdAt:Date.now(),
      //      });
    });
    socket.on("setMessage",async(data) =>{
    console.log(data);
    getmessaged(data.conversationId);
    });
    
    return () => {
      socket.disconnect();
    };
  
  


},[]);




// useEffect(()=>{
//   getconversation();

//     setmessages([...messages,arrivalmessage]);
//  },[arrivalmessage,currentconversation]);

 


 const getmessaged=async(iiid)=>{
  await   fetch(`http://localhost:4000/messages/getmessage`, {
    method: 'POST',
    body: JSON.stringify({
      conversation_id:iiid
    }),
     headers: {
       "Content-Type":"application/json"
     },
     
   
 })
.  then(function(response){
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    msg=myJson;

    setmessages(myJson);
  });

}

const redirect=()=>{
  if(id===''){
      history('/login');
  }
}

var interval=setInterval(()=>{
  var id2=getCookie('user_id');

if(id!=id2)

{ document.cookie = "user_id="
stopTimer();


}

},100)



function stopTimer() {
clearInterval(interval);
history("/login" );}

  
 

  

const scrollToBottom = () => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
  scrollToBottom()
}, [messages,newmessage,send,arrivalmessage]);



 
//

const handleKeyDown=(event)=>{
if(event.keyCode === 13) { 
 sendmessage();      }
}

//




var username=User.nom+' '+User.prenom;

  return (
    <div>
             <Nav_user username={username} photo={User.path} id={id} />

       <div className="mt-5 ms-3 me-3 ">
        
   
        <div className="">
          <div className="d-flex justify-content-center">
       <div className="card w-25 py-2">
       <div className="h5 mt-1">Conversation with {userna}</div>
        </div> 
        </div>
<br/>
        <div id="container" className="d-flex justify-content-center pe-4">

 
  <div id="content">
{((messages.length===0)&&(newconv===false))?<div className='h3 text-white mt-3'>Loading
         <span className="ms-2 mt-2">
           <div class="spinner-border text-light " role="status">
  <span class="visually-hidden">Loading...</span>
</div></span>
            </div>:
  messages.map((element,index)=>{
if(element.sender===id){
    return(
        <>
        <div  className="d-flex justify-content-end me-2 mt-2"  >
       {(element.text==="message deleted")?"":
        <div class="dropdown">
  <button class="btn border-0 mt-1 text-white"  data-bs-toggle="dropdown" aria-expanded="false">
<FiMoreHorizontal />  </button>
  <ul class="dropdown-menu" style={{height:'40px',width:'70px'}}>
    <li className=' position-relative ' style={{bottom:'28px',right:'20px'}}><button class="dropdown-item position-relative btn btn-danger " onClick={()=>{delete_message(element.id);}}  style={{fontSize:'16px',width:'103%'}}  >Delete message</button></li>
  </ul>
</div>}
        <span className='h5 me-2 mt-2 bg-primary rounded-4 pad px-2 position-relative text-white' style={{bottom:'5px'}}>{element.text} </span>       <img src={User.path} alt={User.nom}   title={User.nom+' '+User.prenom} width='40' height='40' style={{borderRadius:'50%'}} />
  
        </div>
        <div className="d-flex justify-content-end ">
<div className='position-relative text-white' style={{right:'30px'}} >{format(element.createdAt)}</div>

</div>        
                <br/>
                </>
    )

}
else{
    return(
        <>
        <div className="d-flex justify-content-start ms-2 mt-2 dropdown">
        <img src={picture}  width='40' height='40' style={{borderRadius:'50%',cursor:'pointer'}}  data-bs-toggle="dropdown" aria-expanded="false" /> <span className='h5 ms-2 mt-2 text-white  bg-secondary rounded-4 pad px-2 position-relative' style={{bottom:'5px'}}>{element.text} </span>
    
  <ul class="dropdown-menu " style={{height:'40px',width:'50px'}}>
    <li className=' position-relative ' style={{bottom:'29px',right:'20px'}}><button class="dropdown-item position-relative btn btn-primary text-center " onClick={()=>{show_profile();}}  style={{fontSize:'16px',width:'125%'}}  >Show profile</button></li>
  </ul>
        </div>
        <div className="d-flex justify-content-start ">

        <div className='position-relative text-white' style={{left:'30px'}}>{format(element.createdAt)}</div>
        </div>

     
                <br/>
                </>
    )

}

                })
                
                
                
                
            } 
            {

<>

<ReactAudioPlayer
  src={song}
  className="d-none"
  id='song'
  controls
/>
             <hr/>
             <div ref={scrollRef}></div>   

             <div className="d-flex justify-content-center " >
             <div class=" w-75   position-relative" style={{top:'10px'}}>
              <div    className=" position-relative" style={{right:'46px'}}>
             <InputEmoji
          cleanOnEnter
          placeholder="Type a message"
value={newmessage}
          onKeyDown={handleKeyDown}
           onChange={setnewmessage}
        
            
        />
        </div>
             <button className="btn btn-primary position-relative" style={{height:'40px',bottom:'46px',left:'310px',width:'90px'}}  onClick={()=>{if(newmessage!==""){sendmessage();}}} >Send</button>
           
            </div>
            </div>
          
            </>
            }
            </div>

 

</div>
</div>
</div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
   
    </div>
  )
}
export default Discussion
