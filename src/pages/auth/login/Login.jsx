import axios from 'axios';
import React, { useState } from 'react'
import './login.scss'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [data , setData] = useState({});
  const navigate = useNavigate()
  const hendleData = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
   }

  const hendleSubmit =async (e)=>{
     e.preventDefault();
   if(Object.entries(data).length == 0){
      return toast.error('plese input valid data....');
   }
   if(!data.password || !data.email){
    return toast.error('email and password required....');
   }
   
     try {
      const config = {headers:{'Content-type':'application/json'}}
      const res= await axios.post('http://localhost:8080/auth/login' , data,config)
      
      if (res.data.success == true){
        toast.success(res.data.message)
        navigate('/')
      }
      else{
        toast.success(res.data.message)
        navigate('/auth/ragistretion')
      }
      
     } catch (error) {
      
      console.log(error)
      toast.error('connection faild , plese check internet connection')
        
     }
  }


  return (
    <div>Login
      <form action="" onSubmit={hendleSubmit}>

      <input type="email" name="email" id="" placeholder='enter valid Email' onChange={hendleData} />
      <input type="password" name="password" id="" placeholder='enter vaild password ' onChange={hendleData}/>
      <button type='submit'>Log In</button>
      </form>

    </div>
  )
}

export default Login