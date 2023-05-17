import React, { useState } from 'react'
// import "./user.css"
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [agree, setAgree] = useState(false);
  
  const navigate = useNavigate()



  const handleLogin = () => {
    if (!email || !password) {
      setErr('All fields are required*')
      return
    }
    else {
      fetch('http://localhost:8080/login', {
        method: 'post',
        mode: "cors",
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(res => {
        return res.json();
      }).then(data => {
        if(data.error){
          console.log(data);
          alert(data.error)
        }
        else{
          console.log(data);
          localStorage.setItem('token',data.token);
         
          navigate('/notes')
        }
        
      }).catch(e => console.log(e))
    }

  }
  return (
    <div className="main">
         
      <div >
        <Typography variant="h3" gutterBottom style={{textAlign:"center"}}>SIGN IN</Typography>
        <hr></hr>
        <div>
        <div>
          {err?<p style={{color:"red"}}>{err}</p>:null}
          </div>
          <div >
          <Typography variant="subtitle2" gutterBottom>Email: </Typography>
           
         
            <OutlinedInput type="text" placeholder='EMAIL' onChange={(e) => { setEmail(e.target.value) }} style={{width:"100%"}} />
          </div>
          <div>
            <br />
          <Typography variant="subtitle2" gutterBottom>Password: </Typography>
         
            <OutlinedInput type="password" placeholder='PASSWORD' onChange={(e) => { setPassword(e.target.value) }} style={{width:"100%"}}/>
          </div>
          <div >
            < Checkbox {...label}  type="checkbox" onChange={(e) => { setAgree(e.target.checked) }} checked={agree} /> Remember me
          </div>
          <div >
            <Button variant="contained" type="submit" disabled={!agree} className='px-4 py-2' onClick={() => { handleLogin() }}>Submit</Button>
          </div>
         
         
        </div>

      </div>

    </div>
  )
}