import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected(props) {
    const navigate = useNavigate()
    const [login,setLogin] = useState("")
    const {Component} = props
    useEffect(()=>{
        const token =localStorage.getItem("token")
        setLogin(localStorage.getItem("token"))
        if(!token){
        navigate("/login");
        }
    })
  return (
    <div>
      {login?<Component/>:null}
    </div>
  )
}
