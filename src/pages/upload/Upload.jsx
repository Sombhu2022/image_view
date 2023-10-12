import { useState } from "react";
import "./upload.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import demoImage from "./demoImage.jpg"

const Upload = () => {
	const [imageData, setImageData] = useState(demoImage);
	const [caption , setCaption]=useState()
	const navigate = useNavigate()

	const handleImageUpload = (event) => {
		const file = event.target.files[0];

		if (file) {
			// Use a FileReader to read the selected image file
			const reader = new FileReader();

			reader.onload = function (e) {
				// Set the result of the FileReader to the state variable
				setImageData(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			// Clear the state variable if no file is selected .. 
			setImageData(null);
		}
	};

	function captionHandle(event){
      
		//console.log(event.target.name)
		setCaption(event.target.value)
  
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("imageData", imageData);
		myForm.append("caption", caption)
		//caption.myForm = myForm
        
		try {
			const config = { headers: {  "Content-Type": "multipart/form-data"} };
			
			const { data } = await axios.post(`http://localhost:8080/api/images`, myForm , config);
          navigate('/')
      console.log(data)

		} catch (error) {
      console.log(error)
    }
	};

	return (
		<>



      <div className='form-container'>
      <form action="" onSubmit={handleSubmit}>
        <input className='submit' type="submit" value="submit" name='submit'/><br></br>
        <input className='caption' type="text" name='caption' placeholder='caption' onChange={captionHandle} />
         
        <input hidden className='file' type="file" name="file" id="file" accept='image/*' onChange={handleImageUpload} />
        <label className='label'  htmlFor="file"><img  id='image' className='input-image' src={imageData} alt="" /></label> 

    </form>
      </div>
    
       <div className='show-data'>
        
       </div>

			{/* <h2>Upload images</h2>
            && means if image are present then get the image 
			{imageData && (
				<img
					src={imageData}
					alt='Image Preview'
					style={{ maxWidth: "100px" }}
				/>
			)}

			<form encType='multipart/form-data' onSubmit={handleSubmit}>
				<input type='file' accept='image/*' onChange={handleImageUpload} />
				<button type='submit'>Upload</button>
			</form> */}
		</>
	);
};

export default Upload;
