import React,{useState} from 'react'
import './Forgetpassword.css'
import {MdOutlineEmail} from 'react-icons/md'
import {HiLockClosed} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'

function Forgetpassword() {


    const [champvide,setchampvide]=useState([]);
    const [emailvalide,setemailValid]=useState(true);
    const dispatch=useDispatch();
    const handleKeyDown=(event)=>{
      if(event.keyCode === 13) { 
        envoyer(event);      }
    }

        let history = useNavigate();
    var vide;
  var [Email, setemail] = useState({email: ""});
const retourne=()=>{
    history("/login" );
  
  }

  const sub=async(e)=>{


    if(Email.email==="")
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
   fetch('http://localhost:4000/checkemail', {
    method: 'POST',
    body: JSON.stringify({
       
       email: Email.email,
      

    }),
    headers: {
      "Content-Type":"application/json"
    },
 })
.then((result) => {
if (result.status != 200) {
    console.log("error");
     setemailValid(false);

}
else{

    dispatch({
        type: "add",
        payload:Email.email
     })
history('/keycheck');
  setemailValid(true);


};


})

// (D) SERVER RESPONSE
.then((response) => {
})

// (E) HANDLE ERRORS - OPTIONAL
.catch((error) => {
console.log(error);
});
  } }




  return (
    <div>

<div className="container">
	<div className="d-flex justify-content-center pt-5">
            <div className="card width-small">

                <div className="text-center card-body">
                  <HiLockClosed size={50} />
                  <div className="text-center title" >Forgot Password?</div>
                  <p className="text-center little">You can reset your password here.</p>
                 
    
    
                      <div className="form-group">
                        <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><MdOutlineEmail /></span>
                          <input id="email" onKeyDown={handleKeyDown} name="email" placeholder="E-mail"  onChange={(e) => { setemail({ ...Email, email: e.target.value });}} className="form-control"  type="email" />
                        </div>
                        {((emailvalide===false)&&(champvide===false))?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">E-mail entré est incorrect</div>:""}
                        {(champvide===true)?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">Please enter your E-mail</div>:""}

                      </div>
                      <br/>
                      <div className='d-flex justify-content-end mt-3'>
                        <button  className="btn  btn-secondary btn-block me-2"  onClick={retourne} >Annuler</button>
                        <button  className="btn  btn-primary btn-block text-nowrap"  onClick={envoyer}>Reset Password</button>
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

export default Forgetpassword
