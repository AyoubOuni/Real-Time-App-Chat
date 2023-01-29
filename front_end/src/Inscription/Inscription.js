import React,{useEffect, useState} from 'react';
import './Inscription.css';
import {SlUser} from 'react-icons/sl'
import {MdOutlineEmail} from 'react-icons/md'
import {HiLockClosed} from 'react-icons/hi'
import {BsTelephone} from 'react-icons/bs'
import {Checknom,Checkemail,Checkpassword,CheckNumerotel} from './CheckData';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'

function Inscription() {
    let history = useNavigate();

    var [User, setuser] = useState({
        id:"",
        nom: "",
        prenom: "",
        email: "",
        password: "",
        tel: "",
        photo:"",
        sexe:"",
        date_creation:"",
      });
///////////////////////////////////////////
const [nameIsValid, setnameIsValid] = useState(null);
const [prenomIsValid, setprenomIsValid] = useState(null);
const [emailIsValid, setemailIsValid] = useState(null);
const [telIsValid, settelIsValid] = useState(null);
const [passwordIsValid, setpasswordIsValid] = useState(null);
const [pictureIsValid, setpictureIsValid] = useState(null);
const [SexeIsValid, setsexeIsValid] = useState(null);
const [emailused, setused] = useState(null);
const [check, setcheck] = useState(null);
///////////////////////////////////////////////////
var name;
var prenom;
var email;
var password;
var tel;
var sexe;
var photo1;
var checking;
function getExt(filename)
{
    var ext = filename.split('.').pop();
    if(ext == filename) return "";
    return ext;
}
      var id;
      
      const id_uuid=uuid();
      id=id_uuid.substr(24);
      User.id=id;
      function getRadioButtonValue() {
        var value= document.getElementsByName("sexe");      
        var selectValue= Array.from(value).find(radio => radio.checked);
            setuser({ ...User, sexe:selectValue.value});
           }
const testing=()=>{
if ((Checknom(User.nom)===false)||(User.nom==='')){
    setnameIsValid(false);
    name=false;

}
else{
    setnameIsValid(true);
    name=true;

}
if ((Checknom(User.prenom)===false)||(User.prenom==='')){
    setprenomIsValid(false);
    prenom=false;
}else{
    setprenomIsValid(true);
    prenom=true;

}
if ((Checkemail(User.email)===false)||(User.email==='')){
    setemailIsValid(false);
    email=false;
}
else{
    setemailIsValid(true);
    email=true;

}
if ((CheckNumerotel(User.tel)===false)||(User.tel==='')){
    settelIsValid(false);
    tel=false;
}
else
{
    settelIsValid(true);
tel=true;
}
if ((Checkpassword(User.password)===false)||(User.password==='')){
    setpasswordIsValid(false);
    password=false;
}
else{
    setpasswordIsValid(true);
password=true;
}


if(User.sexe===''){
    setsexeIsValid(false);
    sexe=false;
}
else 
{sexe=true;
    setsexeIsValid(true);

}

if((User.photo=='')){
    setpictureIsValid(false);
photo1=false;
}
else{
    let fileExtension = User.photo.name.split(".").pop();

 if ((fileExtension.toUpperCase()==='JPG')||(fileExtension.toUpperCase()==='JPEG')||(fileExtension.toUpperCase()==='PNG')||(fileExtension.toUpperCase()==='GIF')){
    setpictureIsValid(true);
    photo1=true;

}
else{
    setpictureIsValid(false);
    photo1=false;

}
}
if(document.getElementById('check').checked){
  setcheck(true);
   checking=true;

}
else{
  setcheck(false);
  checking=false;

}

}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
useEffect(()=>{
  setuser({ ...User, date_creation: today});


},[])
const envoyer=async(e)=>{

e.preventDefault();
 testing();






  if((name)&&(prenom)&&(email)&&(tel)&&(password)&&(sexe)&&(photo1)&&(checking)){
    var iid=User.email+'_'+User.tel;
    var id_token= Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000);

    
   var link=getExt(User.photo.name);
     fetch('http://localhost:4000/inscription', {
       method: 'POST',
       body: JSON.stringify({
          id: User.id,
          sexe: User.sexe,
          nom: User.nom,
          prenom: User.prenom,
          email: User.email,
          password: User.password,
          tel: User.tel,
          username:User.nom+'_'+User.prenom+'_'+id_token,
          photo: 'picture'+'.'+getExt(User.photo.name),
          date_creation:User.date_creation,

       }),
       headers: {
         "Content-Type":"application/json"
       },
    })
 .then((result) => {
   if (result.status != 200) {
     setused(true);
   }
   else{
     setused(false);

var formData = new FormData();
formData.append('file', User.photo);

console.log(User);
fetch(`http://localhost:4000/saveImage/${iid}`, {
method: 'POST',
body: formData,
});


     console.log(result);
     history('/login');

   }
 
  
 })

// (D) SERVER RESPONSE
 .then((response) => {
   console.log(response);
 })

// // (E) HANDLE ERRORS - OPTIONAL
 .catch((error) => {
   console.log(error);
 });
}}
function showpassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const retourne=()=>{
  history("/login" );

}
  return (
    <div className='contain'>
    <div className="pt-5">
    <div className="head ">Inscription</div>  
    <div className=" mt-3 d-flex justify-content-center">
    <div className="card width_meduim rounded-4" >
<div className="card-header ">
<span className="row mt-4  d-flex justify-content-center mb-3">

<span className="input-group width_little ms-3  col-6 ">
<span className="input-group-text" id="basic-addon1"><SlUser /></span>
<input type="text" placeholder='FirstName' className="form-control" onChange={(e) => {setuser({ ...User, nom: e.target.value });}} id='name'/>
{(nameIsValid===false)?<div style={{top:'110%',right:'30%'}} className="text-danger h-6 text-nowrap text position-relative position-absolute">Invalide nom</div>:""}
</span>
<span className="input-group pe-4 width_little col-6">
  <span className="input-group-text" id="basic-addon1"><SlUser /></span>
<input type="text" placeholder='LastName' onChange={(e) => {setuser({ ...User, prenom: e.target.value });}} className="form-control" id='Prenom'/>
{(prenomIsValid===false)?<div style={{top:'110%',right:'24%'}} className="text-danger h-6 text-nowrap text position-relative position-absolute">Invalide Prenom</div>:""}

</span>
</span>

<br/>
<div className="d-flex justify-content-center">
<div className="input-group width_little2 ">
  <span className="input-group-text" id="basic-addon1"><MdOutlineEmail /></span>
<input type="text" placeholder='E-mail' onChange={(e) => {setuser({ ...User, email: e.target.value });}} className="form-control" id='email'/>

</div>

</div>
{(emailIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger h-6 text-nowrap text">Invalide E-mail</div>:""}
{(emailused===true)?<div style={{marginTop:'6px'}} className="text-danger h-6 text-nowrap text">this E-mail is already used!!!</div>:""}

<br/>
<div className="d-flex justify-content-center">

<div className="input-group width_little2 ">
  <span className="input-group-text" id="basic-addon1"><HiLockClosed /></span>
<input type="password" placeholder='Password' onChange={(e) => {setuser({ ...User, password: e.target.value });}}  className="form-control" id='password'/>

</div>
</div>
<div className="me-2 position-relative mb-2 text" style={{top:'10px',right:'27%'}}><input onClick={showpassword} type="checkbox" className="me-2 form-check-input"/><label>Show password</label></div>

{(passwordIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger h-6 text text-nowrap">Invalide Password(must contain minumum<br/> 8 caractere  1 chiffre,1 Uppercase,1 lowercase!)</div>:""}

<br/>

<div className="d-flex justify-content-center">

<div className="input-group  width_little2">
  <span className="input-group-text" id="basic-addon1"><BsTelephone /></span>
<input type="text" placeholder='N°Tel' onChange={(e) => {setuser({ ...User, tel: e.target.value });}} className="form-control" id='tel'/>

</div>
</div>
{(telIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger h-6 text-nowrap text">Invalide N°Tel(must contain 8 chiffre!)</div>:""}

<br/>

<label className='me-3'>Sexe :</label>
<div className="form-check form-check-inline ">
  <input onChange={getRadioButtonValue} className="form-check-input" type="radio" name="sexe" id="inlineRadio1" value="Homme" />
  <label className="form-check-label" htmlFor="inlineRadio1">Homme</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" onChange={getRadioButtonValue} type="radio" name="sexe" id="inlineRadio2" value="Femme" />
  <label className="form-check-label" htmlFor="inlineRadio2">Femme</label>
</div>
{(SexeIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger h-6 text-nowrap text">Please Choose your sexe !</div>:""}


<div className='mt-4'>
<label htmlFor="picture" className='pb-2'>Photo :</label>
<br/>
<div className="d-flex justify-content-center">

<div className="width_little2">
<input type="file" onChange={(e) => {setuser({ ...User, photo: e.target.files[0] });}} className="form-control" id='picture' accept="image/png, image/gif, image/jpeg"/>
{(pictureIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger h-6 text-nowrap text">Invalide picture extension(jpg,jpeg,png)</div>:""}
</div>
</div>
</div>
<br/>
<div className="d-flex justify-content-start position-relative text" style={{left:'8%'}}>

<p>
  <input type="checkbox" id='check' className='me-2 form-check-input'/>
  I agree to the terms of agreement.
</p>
</div>
<div className="d-flex justify-content-start position-relative text" style={{left:'9%',bottom:'10px'}}>

{(check===false)?<div  className="text-danger h-6 text-nowrap text">You must accept the terms and conditions!</div>:""}
</div>

<br/>
<div className="d-flex justify-content-end">
<button className="btn btn-secondary me-2" onClick={retourne}>Annuler</button>
<button className="btn btn-primary" onClick={envoyer} id="valide">Valider</button>
</div>
</div>

    </div>
    </div>
    </div>
    <br/>
    <br/>
    <br/>
    </div>
  )
}

export default Inscription
