import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials,setCredentials]=useState({name: "", email: "" , password: "",cpassword: ""});
  let history= useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const {name,email,password}= credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          
        },
        body: JSON.stringify({ name, email, password }),
      });
            const json= await response.json()
                console.log(json)

                if(json.success){
                    // save the token and redirect
                    localStorage.setItem('token',json.Authtoken);
                    props.showAlert("Account created successfuly", "success")
                    history("/login");  
                }
                else{
                    props.showAlert("invalid details", "danger")
                }
}

const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
}

  return (
    <div className="container mt-2">
      
      <h1>Create an account to iNotebook</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Your Name</label>
    <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp"/>
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
