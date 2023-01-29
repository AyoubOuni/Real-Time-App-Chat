import React from 'react'
import './Nav_user.css';
import {useState,useEffect} from 'react'
import {NavLink} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import {CgLogOut}  from 'react-icons/cg';
import {AiOutlineSearch}  from 'react-icons/ai';

import logo from './logo.png'
import {FaRegUserCircle}  from 'react-icons/fa';
import {MdOutlineArrowDropDown}  from 'react-icons/md';
import {AiFillSetting}  from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'

export default function Nav_user(props) {
    let history = useNavigate();
const [searching,setsearching] = useState();
    const decconect=()=>{
        document.cookie = "user_id="
        history('/login');
      }
    const account=()=>{
        history('/account');
      }
    const search=(e)=>{
      e.preventDefault();
      history(`/search/${searching}`);
    }


    
    const handleKeyDown=(event)=>{
        if(event.keyCode === 13) { 
          history(`/search/${searching}`);      }
    }
    return(
        <>
      
        <span className="sticky " >
      
        <div className="blue ">
          
           <span className="d-flex justify-content-start text-white" >          <NavLink to='/'  className='position-relative left2 top' style={{textDecoration:'none',left:'70px'}}>
<img  className="position-relative mt-1 littlelogo " style={{left:'4%'}}  src={logo} width='55' height='55' />
         <span className="position-relative mt-2 ms-2 h4 text-white goodtext text-nowrap" style={{left:'4%',top:'10px'}}>Chat App </span> </NavLink> 
         <div  className='  position-relative left0 width1' style={{textDecoration:'none',left:'31%',top:'13px'}}>
       <div  className=' input-group '>
  <div class="form-outline">
    <input id="search-input" type="search" onKeyDown={handleKeyDown} onChange={(e)=>{setsearching(e.target.value)}} id="form1" class="form-control" />
  </div>
  <button id="search-button" type="button" onClick={search} class="btn btn-primary height position-relative" style={{right:'2px'}}>
    <AiOutlineSearch />
  </button>
</div>
</div>
         <span className="d-flex justify-content-end  left  text-white position-relative" style={{top:'11px',left:'58%'}}  >

 <div className="dropdown position-relative"  style={{top:'3px',left:'16px'}}>
 <ul className="dropdown-menu dropdown-menu-lg-end" style={{height:'98px'}} aria-labelledby="dropdownMenuButton1">
   <a className="dropdown-item drop  elem goodtext  position-relative" onClick={account}  style={{cursor: 'pointer',bottom:'8px',height:'50px'}} ><span className='position-relative' style={{cursor: 'pointer',top:'7px',right:'16px'}}><AiFillSetting className='ms-3 '/><span className=" h6 position-relative" style={{top:'1.5px',left:'5px'}}>Setting</span></span></a>
   <hr className="position-relative" style={{bottom:'24px'}}/>
   <a className="dropdown-item drop h6 elem goodtext  position-relative" onClick={decconect}  style={{cursor: 'pointer',bottom:'40px',height:'46px'}} ><span className='position-relative' style={{cursor: 'pointer',top:'7px',right:'14px'}}>< CgLogOut className='ms-3 '/><span className=" h6 position-relative" style={{top:'1.5px',left:'5px'}}>Deconnect</span></span></a>
 
 </ul>
 </div>
 <div className=" ms-3 mt-2 h5  head goodtext position-relative text-nowrap set" style={{top:'2px',left:'6px'}}>{props.username}</div>
 {(props.photo===`images/${props.id}/`)?<FaRegUserCircle  size={40}  className='ms-4 position-relative  ' style={{bottom:'20px'}}/>:<img src={props.photo} width='40' height='40'  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className='ms-3 position-relative rounded-5 ' style={{top:'3px',cursor:'pointer'}}/>}
 
 </span>   
           
           </span> 
           
    </div>
   

  
   
    </span>

    </>
   )
}
