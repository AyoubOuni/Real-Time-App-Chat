import React,{useState,useEffect} from 'react'
import './Keycheck.css'
import {MdOutlineEmail} from 'react-icons/md'
import {BsFillKeyFill,BsKeyFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Keycheck() {
    const dispatch=useDispatch();
    const handleKeyDown=(event)=>{
      if(event.keyCode === 13) { 
        envoyer(event);      }
    }
    const user=useSelector(state => state.user);



    const [countDownDate, setCountDownDate] = useState(null);
    const [erer, seterer] = useState("");
    const [tt, settt] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervale, setinterval] = useState(0);

  useEffect(() => {
    // Get the count down date from localStorage
    const storedCountDownDate = localStorage.getItem('countDownDate');

    // Check if the countDownDate is already set
    if (!countDownDate && storedCountDownDate) {
      // Set the count down date
      setCountDownDate(storedCountDownDate);
    } else if (!countDownDate) {
      // Set the count down date
      const newCountDownDate = new Date().getTime() + 120000;
      setCountDownDate(newCountDownDate);
      localStorage.setItem('countDownDate', newCountDownDate);
    }

    // Update the count down every 1 second
    setInterval(()=>{setinterval(intervalId)},1000);
    let intervalId = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setMinutes(minutes)
      setSeconds(seconds)

      // If the count down is finished
      if (distance < 0) {
        clearInterval(intervalId);
        setCountDownDate(null);
        localStorage.removeItem('countDownDate');
          
      setkey('');

      history("/forgetpassword" );
    dispatch({
      type: "supprimer",

   });      
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [countDownDate]);


    
    const [champvide,setchampvide]=useState([]);
    const [keyvalide,setkeyValid]=useState(true);

    
        let history = useNavigate();
    var vide;
  var [inputkey, setinputkey] = useState({key: ""});
  var [key, setkey] = useState();
const retourne=()=>{
  clearInterval(intervale);
  setCountDownDate(null);
  localStorage.removeItem('countDownDate');
  setkey('');

      history("/forgetpassword" );
    dispatch({
      type: "supprimer",

   });


  }


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const sub=async(e)=>{


    if(inputkey.key==="")
    {
      setchampvide(true);
      vide=true;
    }
    else {
      setchampvide(false);
 vide=false;
    }}
useEffect(()=>{get();},[])
    const get=() =>{
        fetch('http://localhost:4000/checkkey', {
            method: 'GET',
           
           
         })
        .  then(function(response){
            return response.json();
          })
          .then(function(myJson) {
            setkey(myJson[0].id_token);
        
          });


    }
    //check for Navigation Timing API support
 
 var msg="";
    window.onpopstate =async function(event) {
      var id_token= Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000);

     await settt(id_token);
      
      history('/keycheck');

};

  
useEffect(()=>{
if(tt===""){
  seterer("");
console.log("jjjj")
console.log(tt)
}
else{
  seterer("you can return only with button return");
  console.log("ddd")

  setTimeout(()=>{seterer("");
msg="";
},5000);

}

},[tt])    

  const envoyer=async(e)=>{

    await sub();
    if(!vide){
   if(key==inputkey.key){
    clearInterval(intervale);
    setCountDownDate(null);
    localStorage.removeItem('countDownDate');
    setkey('');
    setkeyValid(true); 
history('/setnewpassword');


}
    else{
        setkeyValid(false);   
    }



  } }


  return (
    <div>
      


      <div className="container">
        
	<div className="d-flex justify-content-center pt-5">
            <div className="card width-small">
            <div id="countdown" className="position-relative" style={{right:'4%'}} >
    <ul>
   
      <li><span id="minutes">{minutes}</span>Minutes</li>
      <li><span id="seconds">{seconds}</span>Seconds</li>
    </ul>
    </div>

                <div className="text-center card-body position-relative" style={{bottom:'6%'}} >
                  <BsFillKeyFill size={50} />
                  <p className="text-center little">Please put the key.</p>
                 
    
    
                          <input id="email"  onKeyDown={handleKeyDown}  name="email" placeholder="Key"  onChange={(e) => { setinputkey({ key: e.target.value });}} className="form-control"  type="email" />
                        {((keyvalide===false)&&(champvide===false))?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">Key entré est incorrect</div>:""}
                        {(champvide===true)?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">Please enter your Key</div>:""}

                      <br/>
                      <div className="h5 text-nowrap text-primary">{erer}</div>
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

export default Keycheck
