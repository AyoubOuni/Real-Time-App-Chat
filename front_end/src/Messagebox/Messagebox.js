import React from 'react'
import { useState,useEffect } from 'react'

function Messagebox() {

    var [User, setuser] = useState([]);
    var [users, setusers] = useState([]);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

var id=getCookie('user_id');




    

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
    const [conversation,setconversation]=useState([]);
   
const getconversation=async() => {
        await   fetch(`http://localhost:4000/conversation/${id}`, {
               method: 'GET',
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
               console.log(myJson);
             });
    
    
       }
       var conv=[];
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






       
    
    useEffect(()=>{
        get();
        get2();
        check();
    },[]);


    
       useEffect(()=>{
        getconversation();
        check();
       },[id]);
       
    check();
 return(

<></>
  )
}

export default Messagebox
