import React,{useEffect, useState} from 'react'
import './Search.css'
import Nav_user from './../Nav_user/Nav_user'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {FaFacebookMessenger} from 'react-icons/fa'

function Search() {
  


    let { name } = useParams();
    var [User, setuser] = useState([]);
    const[users,setusers]=useState([]);
    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
      }
var i;
var tab;
var name1;
var name2;
const check=()=>{
    i=hasWhiteSpace(name);
    if(i){
         tab = name.split(" ");
name1=tab[0];
name2=tab[1];

    }
}
var k=0;
var h=0;
var tableau=[];
const godiscussion=(username)=>{

history(`/discussion/${username}`);
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

var id=getCookie('user_id');
    
const get2=async() =>{
   await fetch('http://localhost:4000/userbyid', {
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
const items=()=>{
    users.map((elements,index)=>{
      if(name==='undefined'){
        tableau.push(elements);


      }else{
        if(i){

            if(((elements.prenom.toLowerCase().includes(name1.toLowerCase()))&&(elements.nom.toLowerCase().name1.toLowerCase(name2.toLowerCase())))||((elements.nom.toLowerCase().includes(name1.toLowerCase()))&&(elements.prenom.toLowerCase().includes(name2.toLowerCase())))){
                tableau.push(elements);
            }}
            else{
                if(((elements.prenom.toLowerCase().includes(name.toLowerCase())))||((elements.nom.toLowerCase().includes(name.toLowerCase())))){
                    tableau.push(elements);

            }}}


});
}
  
const get=async() =>{
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
         });


   }
      
   useEffect(()=>{

    get();
    get2();
    check();
     items();        

},[]);
 
  
check();
 items();
     
        

        let history = useNavigate();
        var username=User.nom+' '+User.prenom;

        const searching=(id)=>{
if(id===User.username){
    history(`/account`);


}
else{

    history(`/profil/${id}`);

}
        }
  return (
    <>
                     <Nav_user username={username} photo={User.path} id={id} />

    {
    (tableau.length!==0)?
    tableau.map((elements,index)=>{
       

                return(
                    <div className="d-flex justify-content-start  row ms-5" key={index}>
        <div className="py-3">
        <br/>
          <button className='border-0 btn' onClick={()=>{searching(elements.username)}} >   <div>   <img src={elements.path} alt={elements.nom} className="img-responsive me-2" style={{borderRadius:'50%'}} width='60' height='60' /><span className=" h6" >   {elements.nom} {elements.prenom}</span></div></button>
                <br/>
            
                <br/>
                </div>
              {(elements.id!==User.id)?<button className='btn border-0' onClick={()=>godiscussion(elements.username)} >   <FaFacebookMessenger  size={25}  /> </button>:""}  
                <div className=" d-flex justify-content-center">
                <hr className='  border border-2 border-dark w-75'/></div>
        </div>  
        ) 
            }):<div className='h3 text-danger'>Resultat introuvable <u className='text-dark'>{name}</u></div>
        }
           
 </>  
  )
}

export default Search
