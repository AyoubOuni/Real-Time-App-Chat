import React,{useEffect, useState} from 'react'
import Nav_user from './../Nav_user/Nav_user'
import { useParams } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';


function Profil() {
    let { userid } = useParams();
    var [User, setuser] = useState([]);
    const[users,setusers]=useState([]);

  
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

var id=getCookie('user_id');
    
const get2=() =>{
    fetch('http://localhost:4000/userbyid', {
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

const get=() =>{
      fetch('http://localhost:4000/userbyusername', {
          method: 'POST',
          body: JSON.stringify({
              username:userid,
           }),
           headers: {
             "Content-Type":"application/json"
           },
           
         
       })
      .  then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setusers(myJson[0]);
        });


  }
      
  useEffect(()=>{
    get();
    get2();
},[]);
   

var username=User.nom+' '+User.prenom;
   

  return (
    <>
                     <Nav_user username={username} photo={User.path} id={id} />

                     <div className="d-flex justify-content-center mt-5">
                 <div className="card w-50 ">
                 <div className='d-flex justify-content-center'>
                 <div >
      <h2 className="settings-title text-nowrap"><AiFillInfoCircle className='position-relative me-1' style={{bottom:'2px'}} />Account Information</h2>
<div className='titles' style={{fontSize:'20px'}}>

    <img src={users.path} title={users.nom} width='160' height='160'  style={{borderRadius:'50%'}}/>
    <br/>
    <br/>
Name : {users.nom} {users.prenom}

<br/>
Email : {users.email}
<br/>
N°Tel : {users.tel}
<br/>
Sexe : {users.sexe}
</div>
<br/>
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
<br/>      
 </>  
  )
}

export default Profil
