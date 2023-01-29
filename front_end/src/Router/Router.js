import React from 'react'
import { BrowserRouter, Routes, Route,Switch} from "react-router-dom"
import Inscription from "./../Inscription/Inscription"
import Connexion from "./../Connexion/Connexion"
import Forgetpassword from "./../Forgetpassword/Forgetpassword"
import Keycheck from "./../Keycheck/Keycheck"
import Setnewpassword from "./../Setnewpassword/Setnewpassword"
import Home from "./../Home/Home"
import Account from "./../Account/Account"
import Search from "./../Search/Search"
import Profil from "./../Profil/Profil"
import Discussion from '../Discussion/Discussion'
import Notfound from '../Notfound/Notfound'
import Emoj from '../Emoj'

export default function Router() {
  return (
  <BrowserRouter>

  <Routes>      
     <Route exact  path="/inscription"  element={<Inscription />}/>
     <Route exact  path="/login"  element={<Connexion />}/>
     <Route exact  path="/forgetpassword"  element={<Forgetpassword />}/>
     <Route exact  path="/keycheck"  element={<Keycheck />}/>
     <Route exact  path="/setnewpassword"  element={<Setnewpassword />}/>
     <Route exact  path="/"  element={<Home />}/>
     <Route exact  path="/account"  element={<Account />}/>
     <Route exact  path="/search/:name"  element={<Search />}/>
     <Route exact  path="/profil/:userid"  element={<Profil />}/>
     <Route exact  path="/discussion/:current_username"  element={<Discussion />}/>
     <Route path="*" element={<Notfound />} />
     <Route path="/test" element={<Emoj />} />


       </Routes>
  </BrowserRouter>
  )
}
