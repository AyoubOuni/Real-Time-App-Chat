import React, {useState, useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav_user from './../Nav_user/Nav_user'
import './Home.css'
import {io} from "socket.io-client"
import{format} from 'timeago.js'
import{IoSearchSharp} from 'react-icons/io5'
import{VscCircleFilled} from 'react-icons/vsc'
import{FiMoreHorizontal} from 'react-icons/fi'
import song from "./son.mp3";
import ReactAudioPlayer from 'react-audio-player';
import InputEmoji from 'react-input-emoji'

function Home() {

  var socket=io("ws://localhost:8900");

  //declaration
    const scrollRef=useRef();
    let history = useNavigate();
    var [User, setuser] = useState([]);
    var [users, setusers] = useState([]);
    var [currentconversation, setcurrentconversation] = useState(null);
    var [messages, setmessages] = useState([]);
    var [inputsearch, setinputsearch] = useState("");
    var [newconv, setnewconv] = useState(false);
    var [inputconnected, setinputconnected] = useState("");
    var [picture, setpicture] = useState([]);
    var [newmessage, setnewmessage] = useState("");
    var [messageiid, setmessageiid] = useState("");
    var [arrivalmessage, setarrivalmessage] = useState([]);
    var [connected, setconnected] = useState([]);
    var [discuser,setdiscuser] = useState([]);
    var [send, setsend] = useState(null);
    const [conversation,setconversation]=useState([]);
    var conv=[];
    var id=getCookie('user_id');
    var existe=document.cookie.indexOf('user_id');
    var conne=[];
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
  await   fetch('http://localhost:4000/users', {
         method: 'POST',
          headers: {
            "Content-Type":"application/json"
          },
          
        
      })
     .  then(function(response){
         return response.json();
       })
       .then(function(myJson) {
         setusers(myJson);
         console.log(users);
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
       });
 }
//function to show users conversation
const check=()=>{
  conversation.map((elements,index)=>{
      if(elements.members[0]===User.id){
users.map((el,indexx)=>{
if(elements.members[1]===el.id){
conv.push(el);
}
})
          }
          else if (elements.members[1]===User.id){

              users.map((el,indexx)=>{
                  if(elements.members[0]===el.id){
                      conv.push(el);
                  }
                  
                  
                      })
                                  }
        
          });

      }
      var msg="";
//function to show discussion betwwen 2 users
const show=async(iid,path)=>{

 var ex=false;
  
  
          setdiscuser(iid);
          conversation.map(async(elements,index)=>{
              if(elements.members[0]===iid){
                  chat_id=elements._id;
                  setcurrentconversation(elements._id);
                 ex=true;
  }else if (elements.members[1]===iid){
   ex=true;
  
      chat_id=elements._id;
      setcurrentconversation(elements._id);
  
  }
  });
  var t=[];
   if(!ex){
  
  
     await   fetch(`http://localhost:4000/conversation`, {
       method: 'POST',
       body: JSON.stringify({
         senderId:id,
         receiverId:iid,
      }),
        headers: {
          "Content-Type":"application/json"
        },
    }) .  then(function(response){
     return response.json();
   })
   .then((myJson) =>{
     console.log(myJson);
     console.log(myJson._id);
     setcurrentconversation(myJson._id);
     chat_id=myJson._id;
     setnewconv(true);

   }).then(()=>{
     getconversation();
    check();


   })
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
  
        setpicture(path);
  console.log(messages);
  
  
      }
//function show connected user
const conn=()=>{
  {connected.map((element,index)=>{
      if(element.userId!==id){
          users.map((el)=>{
              if(el.id===element.userId){
                  conne.push(el);
              }
          });
 }})};}
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
  receiverId:discuser,
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
const show_profile=async(profile_id)=>{
  users.map((element,index)=>{
      if(element.id===profile_id){
        history(`/profil/${element.username}`);
      }});

 
 
 }

//function send message
const sendmessage=async(e)=>{
  var id_token= Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000);

  setsend(newmessage);
  setmessages([...messages,{
      conversationId:currentconversation,
      sender:id,
      text:newmessage,
      id:id_token,
  
  
    }])
    console.log(messages);
    socket.emit("sendMessage",{
      conversationId:currentconversation,
      userId:id,
      receiverId:discuser,
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



useEffect(()=>{
  conn();
  },[]);
//  useEffect(()=>{
//   getconversation();

//     setmessages([...messages,arrivalmessage]);
//  },[arrivalmessage,currentconversation]);

 // Get saved data from sessionStorage

 


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
setmessageiid(data.conversationId);
});


},[]);
   

useEffect(()=>{
  get();
  get2();
  getconversation();

},[]);

check();

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
history('/login');}
useEffect(()=>{

    redirect();


},[]);
    

    
   
 
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


 


   
//

const handleKeyDown=(event)=>{
  if(event.keyCode === 13) { 
    if(newmessage!==""){   sendmessage(); }
     }
}

//
const scrollToBottom = () => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
  scrollToBottom()
}, [messages,newmessage,send,arrivalmessage]);



var username=User.nom+' '+User.prenom;

conn();
  return (
    <div>
             <Nav_user username={username} photo={User.path} id={id} />

       <div className="mt-5 ms-3 me-3">
        
   
        
        <div id="container">

  <div id="leftThing">

  <div   ><button className='btn border-0' style={{fontSize:'20px'}} onClick={()=>{setcurrentconversation(null)}}>Conversation</button></div>

  <div class="input-group d-flex justify-content-center">

  <input type="search" placeholder='Search'  onChange={(e)=>{setinputsearch(e.target.value)}} style={{height:'40px'}} className="w-75 rounded-1 mb-3 mt-1"/><span className="input-group-text rounded-1 position-relative" style={{height:'41px',top:'3px',cursor:'pointer'}}  ><IoSearchSharp size={20} /></span>
  </div>
  <div className="brodering"></div>

  {
  
 

  
  
  conv.map((elements,index)=>{
   if (inputsearch==="") {
return(
  <>
  <button className="btn hov "  onClick={()=>{show(elements.id,elements.path);}}>
  <div className="d-flex justify-content-start ">
<span className='me-1'>        <img src={elements.path}  width='60' height='60' style={{borderRadius:'50%'}} />  </span>
<div className='ms-1 mt-3'>
<span className='h5'>{elements.nom} </span>      
<span className='h5'>{elements.prenom} </span>     
</div>
</div>

</button>
<div className="brodering"></div>
</>
)

   }
   else{
    
    if((elements.prenom.toLocaleLowerCase().includes(inputsearch.toLocaleLowerCase()))||(elements.nom.toLocaleLowerCase().includes(inputsearch.toLocaleLowerCase()))||((elements.prenom.toLocaleLowerCase()+' '+elements.nom.toLocaleLowerCase())).includes(inputsearch.toLocaleLowerCase())||((elements.nom.toLocaleLowerCase()+' '+elements.prenom.toLocaleLowerCase()).includes(inputsearch.toLocaleLowerCase()))){
      return(
        <>
        <button className="btn hov "  onClick={()=>{show(elements.id,elements.path);}}>
        <div className="d-flex justify-content-start ">
<span className='me-1'>        <img src={elements.path} alt={elements.nom}   title={elements.nom+' '+elements.prenom}  width='60' height='60' style={{borderRadius:'50%'}} />  </span>
<div className='ms-1 mt-3'>
<span className='h5'>{elements.nom} </span>      
<span className='h5'>{elements.prenom} </span>     
</div>
</div>    
      </button>
      <div className="brodering"></div>
      </>
      )


    }
   
   }
   })
 


}
</div>

  <div id="content">
{(currentconversation===null)?<div className="d-flex justify-content-center h2 ms-3 text-white" style={{verticalAlign: 'middle',textAlign: 'center',paddingTop:'175px'}}>Open a conversation &#128580;	</div>:
((messages.length===0)&&(newconv===false))?<div className='h3 text-white mt-3'>Loading
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
    <li className=' position-relative ' style={{bottom:'29px',right:'20px'}}><button class="dropdown-item position-relative btn btn-primary text-center " onClick={()=>{show_profile(element.sender);}}  style={{fontSize:'16px',width:'125%'}}  >Show profile</button></li>
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
            {(currentconversation===null)?<div></div>:
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

  <div id="rightThing">
    <div style={{fontSize:'20px'}}>Connected</div>
    <div class="input-group d-flex justify-content-center">

<input type="search" placeholder='Search' onChange={(e)=>{setinputconnected(e.target.value)}} style={{height:'40px'}} className="w-75 rounded-1 mb-3 mt-1"/><span className="input-group-text rounded-1 position-relative" style={{height:'41px',top:'3px',cursor:'pointer'}}  ><IoSearchSharp size={20} /></span>
</div>
    <div className="brodering"></div>

  {conne.map((element,index)=>{
       if (inputconnected==="") {

    return(
        <>

<button className="btn hov "  onClick={()=>{show(element.id,element.path);}}>

<div className="d-flex justify-content-start position-relative">

<span className=''>        <img src={element.path}  width='40' height='40' style={{borderRadius:'50%'}} /><VscCircleFilled className='position-relative' size={23} style={{color:'green',right:'17px',top:'13px'}} />  </span>

<div className=' mt-1 position-relative' style={{right:'10px',top:'3px'}}>

        <span className='h5'>{element.nom} </span>      
        <span className='h5'>{element.prenom} </span>   

        </div>   
</div>
        
        </button>

                <div className="brodering"></div>

                </>
    )}
    else{
      if((element.prenom.toLocaleLowerCase().includes(inputconnected.toLocaleLowerCase()))||(element.nom.toLocaleLowerCase().includes(inputconnected.toLocaleLowerCase()))||((element.prenom.toLocaleLowerCase()+' '+element.nom.toLocaleLowerCase())).includes(inputconnected.toLocaleLowerCase())||((element.nom.toLocaleLowerCase()+' '+element.prenom.toLocaleLowerCase()).includes(inputconnected.toLocaleLowerCase()))){


      return(
        <>

        <button className="btn hov "  onClick={()=>{show(element.id,element.path);}}>
        
        <div className="d-flex justify-content-start position-relative">
        
        <span className=''>        <img src={element.path}  width='40' height='40' style={{borderRadius:'50%'}} /><VscCircleFilled className='position-relative' size={23} style={{color:'green',right:'17px',top:'13px'}} />  </span>
        
        <div className=' mt-1 position-relative' style={{right:'10px',top:'3px'}}>
        
                <span className='h5'>{element.nom} </span>      
                <span className='h5'>{element.prenom} </span>   
        
                </div>   
        </div>
                
                </button>
        
                        <div className="brodering"></div>
        
                        </>
    )

    }}




                })
                
                
                
                
            }  </div>

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
   
    </div>
  )
}
export default Home
