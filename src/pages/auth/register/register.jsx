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
         
        try {

          if(!Object.entries(data).length){
            toast.error('plese input valid data...',{position:'bottom-center'})
            }
        else{
                if(data.password != data.cpassword){
                  console.log(data.password , data.cpassword)
                  toast.error('password and confirm password are not match',{position:'bottom-center'})
              }
              else{
                
                  const config = {headers:{'Content-type':'application/json'}};
                  const res= await axios.post('http://localhost:8080/auth/register',data,config)
                  console.log(res)
                  toast.success(res.data.message)
            }
        }
          
        } catch (error) {
          console.error('err',error)
         toast.error('poor connection');

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