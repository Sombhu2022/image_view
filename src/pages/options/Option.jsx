import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Option() {
   
const {id} = useParams()
const [image , setImage] = useState({})

const getData = async (id)=>{

   try{

       const { data} = await axios.get(`http://localhost:8080/api/images/${id}`)
       setImage(data.Image)
       console.log(data)
   }
   catch(err){
    console.log("error=>",err)
   }
}

useEffect(()=>{
    getData(id)
},[id])


const deleteImage = async (id)=>{
    try{
        const data = await axios.delete(`http://localhost:8080/api/images/${id}`)
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

  return (

    <div><h3>Manage your Image</h3>
    {
    image &&(
         <div>
        <img src={image.url} alt="Image" />
        <p >{image.caption}</p>
        {/* <button onClick={()=>editImage(image._id)}>Edit</button> */}
        <button onClick={()=>deleteImage(image._id)}>Delete</button>
        </div>
    )
    }
            </div>
    
  )
}

export default Option