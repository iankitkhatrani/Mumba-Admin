// Login.js
import React, { useState,useContext } from 'react';
import styles from './Login.module.css'; // Import CSS module
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const host = "http://16.170.158.18:3000";



function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    logintype:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const LoginData = async (data) => {
      try{
          console.log("PlayerList :::::::",host)
          const response = await fetch(`${host}/admin/login`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
          }).then(d => d.json())

          console.log("data api from :latatestUser :::...", response)
          return response


      }catch(e){
          console.log("e :" ,e)
      }
  } 


  const OnChange = async (event) => {
    let { name, value } = event.target;
    console.log("name ",name)
    console.log("name ",value)

    await setFormData({
        ...formData,
        [name]: value,
    });

    console.log("handleChange ::::::::::::::::::::::",formData)
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    let resData = await LoginData(formData)
    console.log(resData)

    if(resData.status){
      
        //props.setToken(resData.data.token);
        props.setAdmin(resData.data.name);
        props.setAdminEmail(resData.data.email)

        cookies.set('token', resData.data.token);
        cookies.set('name', resData.data.name);
        cookies.set('email', resData.data.email);

      

    }else{
      alert("Please Enter valid Email Or Passward..!!")
    }
  };

  return (
    <div className={styles.layout}>
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Id:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className={styles.rowwise}>
                    
       
        <label>
            <input
            type="radio"
            value="Admin"
            name="logintype"
            checked={formData.logintype === "Admin"}
            onChange={OnChange}
            />
            Admin
        </label>
        <label>
            <input
            type="radio"
            value="Agent"
            name="logintype"
            checked={formData.logintype === "Agent"}
            onChange={OnChange}
            />
            Agent
        </label>
        <label>
            <input
            type="radio"
            value="Shop"
            name="logintype"
            checked={formData.logintype === "Shop"}
            onChange={OnChange}
            />
            Shop
        </label>
        </div>
                    

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
