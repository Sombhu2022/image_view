import React, { useState } from 'react'
import Login from '../login/Login'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import './register.scss'


function register() {
    const [user , setUser] = useState({})
    const navigate = useNavigate()

    const handleData= async(e)=>{
       
        setUser({ ...user , [e.target.name]:e.target.value})
        console.log(user)
    }

    const createNewUser= async (e)=>{
        e.preventDefault();
   
    try {

        if(Object.entries(user).length == 0){
            return toast.error('plese input valid data....');
         }
         if(!user.name || !user.email || !user.password){
          return toast.error('name and email and password required....');
         }
         
         if(user.password.length < 8){
          return toast.error('password must be 8 characters....');
         }

         if(user.password != user.cpassword){
          return toast.error('password and confirm password are not match...')
        }
        
         
      
            //const config = {headers:{'Content-type':'application/json'},  withCedentials:true};
            const {data} = await axios.post('http://localhost:8080/auth/register',user,  {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
            console.log(data)
            toast.success(data.message)
           
            navigate('/')
        } catch (error) {
        console.error('err',error)
        toast.error(error.response.data.message);
        
        }
       
    } 
   
  return (
    <div>
       <form action="" className='auth-form' onSubmit={createNewUser}>
       <b style={{fontSize:"25px"}}>registration form </b>
       <input type="name"  placeholder='enter fullname ' name='name' onChange={handleData}/>
       <input type="email" name="email" id="email" placeholder='enter Email' onChange={handleData} />
       <input type="password" name="password" id="pass1" placeholder='enter password ' onChange={handleData}/>
       <input type="password" name="cpassword" id="pass2" placeholder='enter  confirm password' onChange={handleData} />
       <button type='submit'> Register </button>
       <hr />
       <b>You have alrady register </b>
       <Link to={'/auth/login'}> <button> Log in </button> </Link>
       </form>
       

    </div>
  )
}

export default register