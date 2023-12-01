// Login.js
import React, { useState,useContext } from 'react';
import styles from './Login.module.css'; // Import CSS module
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const host = "http://192.168.0.203:2828";



function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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



  const handleSubmit = async (e) => {
    e.preventDefault();

    let resData = await LoginData(formData)
    console.log(resData.status)

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
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
