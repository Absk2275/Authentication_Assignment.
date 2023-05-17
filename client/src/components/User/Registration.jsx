import React, { useState } from 'react'
// import "./user.css"

import { Link, useNavigate } from 'react-router-dom';


import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Registration() {

  const Navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPass, setConPass] = useState("")
  const [agree, setAgree] = useState(false);
  const [err,setErr] = useState("");
  const [success, setSuccess]=useState("");
  const handleRegister = ()=>{
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email || !password || !conPass){
                setErr('All fields are required*')
                return
            }
            if(!email===""){
                if(!emailRegex.test(email)){
                    setErr('please enter a valid email')
                    return
                }
            }
            if(password.length<7){
                setErr('Password must be greater than 7 characters');
                return
            }
            if(password!==conPass){
                setErr('Password not matched')
              return
            }
            else{
              setErr("")
                fetch('http://localhost:8080/signup',{
                    method: 'post',
                    mode : "cors",
                    headers : {
                        'Content-Type' : 'Application/json',                 
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(res=>{
                    return res.json();
                }).then(data=>{
                  if(data.error){
                    setErr(data.error)
                  }else{
                    console.log(data);
                    setSuccess("Registration Success Please Login");
                    Navigate("/login");
                    // setEmail("");
                    // setPassword("");
                    // setConPass("");
                  }
                 
                }).catch(e=>console.log(e))            
            }
}
  return (
    <div className="main">
      <div >
        <Typography variant="h3" style={{textAlign:"center"}}>SIGN UP</Typography>
        <hr></hr>
        <div>
          <div>
          {err?<p style={{color:"red"}}>{err}</p>:<p style={{color:"green"}}>{success}</p>}
            <Typography variant="subtitle2" gutterBottom>Email: </Typography>
            <OutlinedInput type="email" placeholder='EMAIL' onChange={(e) => { setEmail(e.target.value) }} style={{width:"100%"}}/>
          </div>
          <div >
          <Typography variant="subtitle2" gutterBottom>Password: </Typography>
            <OutlinedInput type="password" placeholder='PASSWORD' onChange={(e) => { setPassword(e.target.value) }} style={{width:"100%"}}/>
          </div>
          <div >
          <Typography variant="subtitle2" gutterBottom>Confirm Password: </Typography>
            <OutlinedInput  type="password" placeholder='REPEAT PASSWORD' onChange={(e) => { setConPass(e.target.value) }} style={{width:"100%"}}/>
          </div>
         
          <div>
            <Checkbox {...label} type="checkbox" onChange={(e) => { setAgree(e.target.checked) }} checked={agree} style={{ color: "black", fontSize:"small"}} /> I agree with the <a style={{ color: "black"}} href="#">Terms & Conditions</a>
          </div>
          <div>
            <Button variant="contained" type="submit" disabled={!agree}  onClick={()=>{handleRegister()}}>Submit</Button>
          </div>
          <div>
            Already have an account ?
            <span>
              <Link to={"/login"}> Log in</Link>
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}