import React,{useState} from 'react'
import './Connexion.css'
import {MdAlternateEmail} from 'react-icons/md'
import {AiFillPlusCircle} from 'react-icons/ai'
import {HiLockClosed} from 'react-icons/hi'
import {FaUserCircle} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Connexion() {
    let history = useNavigate();
    const handleKeyDown=(event)=>{
      if(event.keyCode === 13) { 
        envoyer(event);      }
    }
    function showpassword() {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      };
const inscrip=()=>{
    
    
      history("/inscription" );
}
const forgetpassword=()=>{
    
    
      history("/forgetpassword" );
}

const [champvide,setchampvide]=useState([]);
  const [connexionIsValid, setconnexionValid] = useState(true);

  var [user, setuser] = useState({
    email: "",
    password: ""
  });
  var vide;
  const sub=async(e)=>{


   if(user.email===""||user.password==="")
   {
     setchampvide(true);
     vide=true;
   }
   else {
     setchampvide(false);
vide=false;
   }}
const envoyer=async(e)=>{
    e.preventDefault();
    sub();
    if(!vide){
   fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify({
       
       email: user.email,
       password: user.password,
      

    }),
    headers: {
      "Content-Type":"application/json"
    },
 })




.then((result) => {

if (result.status != 200) {
    console.log("error");
     setconnexionValid(false);

}
else{

  console.log(result);
   setconnexionValid(true);

}
return result.json();


})

// (D) SERVER RESPONSE
.then((response) => {
  var expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);
   document.cookie=`user_id=${response[0].id};expires=${expiryDate};path=/`;

}).then(()=>{
  history('/');

})

// (E) HANDLE ERRORS - OPTIONAL
.catch((error) => {
console.log(error);
});
  } }
  window.onpopstate = function(event) {

    
    history('/login');

};


  return (
    <div>
    <div className='d-flex justify-content-center pt-5'>
      
      <div className="card width-small2" >
    
       
        <h1 className="card-header fs-5 title" id="exampleModalLabel">Connexion</h1>
      <div className="card-body">
      <div className="container" >
       <div className="form-box" >
         <div className="header-form">
           <h4 className=" mb-4 text-center" style={{color:'black'}}><FaUserCircle size={100} /></h4>
           <div className="image">
           </div>
         </div>
         <div className="body-form">
            <div className="row">
             <div className="input-group mb-4   ">
  <div className="input-group-prepend">
   <span className="input-group-text h-100 px-3 position-relative " style={{left:'6px'}}><MdAlternateEmail size={25}/></span>
 </div>
 <input type="email" name='email' className="form-control"   onChange={(e) => { setuser({ ...user, email: e.target.value });}} style={{height:'40px',fontSize:'14px'}}  placeholder="E-mail" />
</div>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
  <span className="input-group-text h-100 px-3 position-relative" style={{left:'6px'}}><HiLockClosed size={25}/></span>
</div>
 <input type="password" onKeyDown={handleKeyDown} name='mdp' id="password"  className="form-control " onChange={(e) => { setuser({ ...user, password: e.target.value });}} style={{height:'40px',fontSize:'14px'}} placeholder="Mot de passe " />
</div>
<div className="me-2 position-relative h6  " style={{top:'-2px',right:'18%'}}><input type="checkbox" onClick={showpassword} className="me-2 form-check-input"/><label className="mt-1" style={{fontSize:'14px'}}>Afficher le mot de passe</label>
</div>
{((connexionIsValid===false)&&(champvide===false))?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger little2  text-nowrap">Le mot de passe entré est incorrect</div>:""}
{(champvide===true)?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger little2   text-nowrap">Please enter your e-mail and password</div>:""}

<div className=" position-relative" style={{bottom:'13px'}}>

<div className="d-flex justify-content-start position-relative" style={{top:'28px'}}>
<div className="ms-3 "><a style={{fontSize:'14px',cursor:'pointer'}} onClick={forgetpassword} className='text-danger little2'>Mot de passe oublié?</a></div>
</div>
</div>
<br/>
<div className='d-flex justify-content-end '>
<button   onClick={envoyer}  className="btn btn-danger  little2   ">SE CONNECTER</button>
</div>

<div className="d-flex justify-content-center d-inline ">
<span className="w-50 mt-4 border border-dark border-bottom-0 border-start-0 border-end-0 border-3" /><span className="h6 text-dark px-2 little2" style={{marginTop:'15px'}}>OU</span><span className="w-50 mt-4 border border-dark border-bottom-0 border-start-0 border-end-0 border-3" /> 
</div>
<div className='d-flex justify-content-center mt-4 '>
<a   className="btn  btn- little2  text-center text-white text-nowrap" onClick={inscrip} style={{width:'200px',height:'38px',fontSize:'17px',backgroundColor:'#272727'}}    id="create_account"><span className="position-relative me-2" style={{bottom:'2.5px'}}><AiFillPlusCircle/></span>CRÉER UN COMPTE</a>

</div>

    </div>
    </div>
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
        </div>
  )
}

export default Connexion
