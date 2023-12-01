import './App.css';
import Dashbord from './Dashbord/Dashbord.js';
import MobileCheck from './Component/Utilities/MobileCheck/MobileCheck';
import OfferState from './context/OfferState';
import React, { useState,useContext} from 'react';
import Login from './Component/Login/Login.js';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {

  //const [tokendata, setTokendata] = useState("");
  const [adminname, setAdminname] = useState();
  const [adminEmail, setAdminEmail] = useState();

  const tokendata  = cookies.get('token')
  const name = cookies.get('name')
  const email = cookies.get('email')


  console.log("tokendata LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",tokendata)
  //setToken={setTokendata}
    if(!tokendata) {
        return <Login setAdmin={setAdminname}  setAdminEmail={setAdminEmail}/>
    }

  return (

    <OfferState adminname={name} adminEmail={email} tokendata={tokendata}>
    <div >
      <MobileCheck/>
      <Dashbord adminname={name} adminEmail={email} tokendata={tokendata} />
    </div>
    </OfferState>
  );
}

export default App;
