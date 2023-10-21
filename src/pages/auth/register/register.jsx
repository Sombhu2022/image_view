import React, { useState } from 'react'
import Login from '../login/Login'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import './register.scss'

function register() {
    const [data , setData] = useState({})
    const handleData= async(e)=>{
       
        setData({ ...data , [e.target.name]:e.target.value})
        console.log(data)
    }

    const createNewUser= async (e)=>{
        e.preventDefault();

        if(Object.entries(data).length == 0){
            return toast.error('plese input valid data....');
         }
         if(!data.name || !data.email){
          return toast.error('name and email required....');
         }
         
         if(data.password.length < 8){
          return toast.error('password must be 8 characters....');
         }

         if(data.password != data.cpassword){
          return toast.error('password and confirm password are not match...')
        }
        
         
       try {
            const config = {headers:{'Content-type':'application/json'}};
            const res= await axios.post('http://localhost:8080/auth/register',data,config)
            console.log(res)
            toast.success(res.data.message)

        } catch (error) {
        console.error('err',error)
        toast.error(error.response.data.message);

        }
       
    } 
   
  return (
    <div>registration form 
       <form action="" onSubmit={createNewUser}>
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